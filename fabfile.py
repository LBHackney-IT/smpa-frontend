import gzip
import hashlib
import os
from datetime import date, datetime, timedelta

import boto3
import mimetypes
from fabric.api import env, task
from fabric.colors import blue, cyan, green, magenta, red, yellow  # NOQA
from io import BytesIO


CDN = {
    'aws_access_key': os.environ.get('AWS_ACCESS_KEY_ID', None),
    'aws_secret_key': os.environ.get('AWS_SECRET_ACCESS_KEY', None),
    'aws_endpoint': 's3-eu-west-2.amazonaws.com',
    'aws_region': 'eu-west-2',
    'source': './planning-app/dist/'
}


@task
def prod():
    """Set the bucket and sitename to production values"""
    env.files = []
    env.static_stats = {
        'uploaded': 0,
        'modified': 0,
        'new': 0,
        'skipped': 0,
    }
    env.cdn = CDN
    env.cdn['aws_bucket'] = 'planningapplication.hackney.gov.uk'
    env.cdn['aws_sitename'] = 'planningapplication.hackney.gov.uk'
    env.TAG = 'production'


@task
def stage():
    """Set the bucket and sitename to staging values"""
    env.files = []
    env.static_stats = {
        'uploaded': 0,
        'modified': 0,
        'new': 0,
        'skipped': 0,
    }
    env.cdn = CDN
    env.cdn['aws_bucket'] = 'smpa-frontend-staging'
    env.cdn['aws_sitename'] = 'smpa-frontend-staging'
    env.TAG = 'staging'


@task
def hactar():
    """Set the bucket and sitename to hactar values"""
    env.files = []
    env.static_stats = {
        'uploaded': 0,
        'modified': 0,
        'new': 0,
        'skipped': 0,
    }
    env.cdn = {
        'aws_access_key': os.environ.get('HACTAR_AWS_ACCESS_KEY_ID', None),
        'aws_secret_key': os.environ.get('HACTAR_AWS_SECRET_ACCESS_KEY', None),
        'aws_endpoint': 's3-eu-west-2.amazonaws.com',
        'aws_region': 'eu-west-2',
        'source': './planning-app/dist/'
    }
    env.cdn['aws_bucket'] = 'smpa.hactar.is'
    env.cdn['aws_sitename'] = 'smpa.hactar.is'
    env.TAG = 'hactar'


@task
def deploy():
    """Deploy the site to S3"""
    folder = env.cdn['source']
    print('PUT: {}'.format(folder))
    put_contents(folder)
    print("Deployed static files.")
    write_log()


def get_s3():
    """Get an S3 bucket resource and return it.
    """
    s3 = boto3.resource(
        's3',
        aws_access_key_id=env.cdn['aws_access_key'],
        aws_secret_access_key=env.cdn['aws_secret_key'],
        region_name=env.cdn['aws_region']
    )
    return s3


def put_folder(folder):
    """Put a folder on S3
    """
    print("UPLOADING {}".format(folder))
    if not os.path.isdir(folder):
        print('{} is not a directory'.format(folder))
    for path, directories, files in os.walk(folder):
        counter = 0
        for f in files:
            counter += 1
            put_file(folder, path, directories, f)


def put_contents(folder):
    """Put a folder on S3
    """
    print("UPLOADING {}".format(folder))
    if not os.path.isdir(folder):
        print('{} is not a directory'.format(folder))
    for path, directories, files in os.walk(folder):
        counter = 0
        for f in files:
            counter += 1
            put_file(folder, path, directories, f)


def put_file(folder, path, directories, f):
    """Put a file on S3
    """
    bucket = env.cdn['aws_bucket']
    ignore_files = ['.DS_Store', '.gitkeep']
    ignore_extensions = ['.scss', ]
    checksums = get_checksums()
    the_future = date.today() + timedelta(days=365 * 10)
    src = os.path.join(path, f)
    dest = os.path.join(
        os.path.basename(folder),
        os.path.relpath(os.path.join(path, f), folder)
    )
    md5 = checksum(src)
    env.files.append('{} {}'.format(src, md5))
    prev_hash = file_hash(checksums, src)
    if prev_hash is None:
        env.static_stats['new'] += 1
        print('NEW: {} -> {}'.format(f, dest))
    elif md5 == file_hash(checksums, src):
        env.static_stats['skipped'] += 1
        return False
    else:
        env.static_stats['modified'] += 1
        print('MODIFIED: {} -> {}'.format(f, dest))

    filename, file_extension = os.path.splitext(f)
    if f not in ignore_files and file_extension not in ignore_extensions:
        content, compressed = get_file_content(src)
        s3 = get_s3()
        args = {
            "Body": content,
            "Expires": str(the_future),
            "ACL": 'public-read',
        }
        mime = mimetypes.guess_type(src)[0]
        if mime is not None:
            args["ContentType"] = mime
        if compressed:
            args['ContentEncoding'] = 'gzip'
        s3.Object(bucket, dest).put(**args)
        env.static_stats['uploaded'] += 1


def get_checksums():
    logged = []
    # Ensure the log file exists
    try:
        open('deploy_%s.log' % env.TAG, 'a+')
    except IOError:
        print(yellow('static files log does not exist'))
    else:
        with open('deploy_%s.log' % env.TAG, 'r') as files_log:
            files_log.seek(0)
            for row in [_.rstrip("\n").split(' ') for _ in files_log.readlines()]:
                logged.append({'file': row[0], 'checksum': row[1]})
    return logged


def checksum(src, blocksize=1 << 16):
    md5 = hashlib.md5()
    with open(src, 'rb') as f:
        while True:
            block = f.read(blocksize)
            if not block:
                break
            md5.update(block)

    return md5.hexdigest()


def file_hash(checksums, src):
    found = next((item for item in checksums if item["file"] == src), None)
    if found is not None and 'checksum' in found:
        return found['checksum']
    else:
        return None


def get_file_content(src):
    """Gets file content to write as the S3 key. If it's compressable,
    then we compress in memory first.
    """
    compressable = ['.css', '.js', '.html', '.svg']
    ext = os.path.splitext(src)[1]
    if ext in compressable:
        compressed = gzip_in_memory(src)
        return compressed, True
    else:
        return open(src, 'rb'), False


def gzip_in_memory(src):
    """gzip a file in memory and return the buffer
    """
    out = BytesIO()
    infile = open(src, 'rb').read()
    with gzip.GzipFile(fileobj=out, mode="w") as f:
        f.write(infile)
    return out.getvalue()


def invalidate_cloudfront():
    cloudfront = boto3.client('cloudfront')
    cloudfront.create_invalidation(
        DistributionId=env.cdn['aws_cloudfront_id'],
        InvalidationBatch={
            'Paths': {
                'Quantity': 1,
                'Items': ['/']
            },
            'CallerReference': 'my-references-{}'.format(datetime.now())
        }
    )


def write_log():
    with open('deploy_%s.log' % env.TAG, 'w') as logfile:
        for _ in env.files:
            logfile.write('{}\n'.format(_))
