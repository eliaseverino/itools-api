const { Router } = require('express');
const app = Router();
const fs = require('fs');

const { del } = require('../../lib/clean'); // File clean controller.
const upload = require('../../lib/multer'); // Our own Multer middleware for the file upload.

const blur = require('./controllers/blur').full;


app.post('/:level', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files[0];
    const L = parseInt(req.params.level);

    try {

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
        del(blurImagePath);
    } finally { del(I.path); res.end();}

});




module.exports = app;