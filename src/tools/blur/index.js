const { Router } = require('express');
const app = Router();
const fs = require('fs');

const { del } = require('../../lib/clean'); // File clean controller.
const upload = require('../../lib/multer'); // Our own Multer middleware for the file upload.
const imageProperties = require('../../lib/imageProperties');

const blur = require('./controllers/blur').full;


app.post('/:level', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;
    const L = parseInt(req.params.level);

    // Get the image size.
    const size = await imageProperties.getSize(I.path);

    try {
        // Verify the image.
        if (!I) {
            res.status(400).json({ success: false, message: 'Image not found.' });
            return;
        }

        // Check the image size.
        if (!size) {
            res.status(400).json({ success: false, message: 'An error occurred while the image was being processed.' });
            return;
        } else if (size.w > 5000 || size.h > 5000) {
            res.status(400).json({ success: false, message: 'The image exceeds 5000x5000px (maximum size allowed).' });
            return;
        }

        // Check the blur level.
        if (!L || L < 1 || L > 100) {
            res.json({ success: false, message: 'The blur level isn\'t correct.' });
            return;
        }

        // Apply blur.
        const blurImagePath = await blur(I.path, L);

        // Read the result image.
        const blurImageBuffer = fs.readFileSync(blurImagePath);

        // Save the image data.
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': blurImageBuffer.length
        });

        // Return the processed image.
        res.end(blurImageBuffer);

        // On finish delete the files.
        del([blurImagePath, I.path]);
    } finally { del(I?.path); res.end(); }
});

app.post('/', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;
    const L = parseInt(req.body?.level);

    // Get the image size.
    const size = await imageProperties.getSize(I.path);

    try {
        // Verify the image.
        if (!I) {
            res.status(400).json({ success: false, message: 'Image not found.' });
            return;
        }

        // Check the image size.
        if (!size) {
            res.status(400).json({ success: false, message: 'An error occurred while the image was being processed.' });
            return;
        } else if (size.w > 5000 || size.h > 5000) {
            res.status(400).json({ success: false, message: 'The image exceeds 5000x5000px (maximum size allowed).' });
            return;
        }

        // Check the blur level.
        if (!L || L < 1 || L > 100) {
            res.json({ success: false, message: 'The blur level isn\'t correct.' });
            return;
        }

        // Apply blur.
        const blurImagePath = await blur(I.path, L);

        // Read the result image.
        const blurImageBuffer = fs.readFileSync(blurImagePath);

        // Save the image data.
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': blurImageBuffer.length
        });

        // Return the processed image.
        res.end(blurImageBuffer);

        // On finish delete the files.
        del([blurImagePath, I.path]);
    } finally { del(I?.path); res.end(); }
});






module.exports = app;