# Deploying

1) Ensure you have a .env file inside `planning-app-ui` containing a development EnvKey for the Hackney SmPA project.

2) If this is the first time you're deploying, run `pipenv install`, otherwise skip to step 3.

3) Run `pipenv shell` to activate the python env

4) Run `goenv`

5) Run `fab prod deploy`


# Force deploying

Each deploy stores a record of files uploaded and a hash of their contents in `deploy_production.log` - You can force a deploy of all files just by deleting the contents of this log.