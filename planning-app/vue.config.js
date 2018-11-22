module.exports = {
    css: {
        extract: { 
            filename: "styles.css" 
        }
    },

    pluginOptions: {
      s3Deploy: {
        awsProfile: 'default',
        region: 'eu-west-2',
        bucket: 'smpa.hactar.is',
        createBucket: false,
        staticHosting: false,
        assetPath: 'dist',
        assetMatch: '**',
        deployPath: '/',
        acl: 'public-read',
        pwa: false,
        enableCloudfront: false,
        uploadConcurrency: 5,
        pluginVersion: '3.0.0'
      }
    }
}
