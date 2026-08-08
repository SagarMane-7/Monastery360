const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILE,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

async function uploadFile(localPath, destination) {
    await bucket.upload(localPath, {
        destination,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });

    const file = bucket.file(destination);
    await file.makePublic();

    return `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${destination}`;
}

async function deleteFile(filename) {
    await bucket.file(filename).delete();
}

async function getSignedUrl(filename, expiryMinutes = 60) {
    const [url] = await bucket.file(filename).getSignedUrl({
        action: 'read',
        expires: Date.now() + expiryMinutes * 60 * 1000,
    });
    return url;
}

async function listFiles(prefix) {
    const [files] = await bucket.getFiles({ prefix });
    return files.map((f) => f.name);
}

module.exports = {
    storage,
    bucket,
    uploadFile,
    deleteFile,
    getSignedUrl,
    listFiles,
};
