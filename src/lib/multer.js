const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the path where the images will be uploaded.
const upFolder = process.env.UPLOADS_FOLDER || 'uploads/';

// If the upload folder does not exist, create it.
if (!fs.existsSync(upFolder)) fs.mkdirSync(upFolder);

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, upFolder); }, // Defines the destination folder for images.
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true); // To accept only images.
    else cb(new Error('Only image files are allowed.'), false);
};

const config = {
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 100, }, // Limit the image size to 100MB (WTF).
};

module.exports = multer(config);
