const { Router } = require('express');
const app = Router();
const fs = require('fs');

const upload = require('../../lib/multer');
const { del } = require('../../lib/clean'); // File clean controller.
const { imageReturn } = require('../../lib/image');
const { scale } = require('./controllers/scale');
const { resize, resizeTypes, resizeTypes_itools } = require('./controllers/resize');

app.post('/', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;

    try {
        // Verify the image.
        if (!I) { res.status(400).json({ success: false, message: 'Image not found.' }); return; }

        // Process image.
        let processedImage;

        ////////// SCALE //////////
        if (req.body.scale) {
            let s;

            // Verify the JSON format.
            try { s = Number(req.body.scale); }
            catch (error) { res.status(400).json({ success: false, message: 'Your JSON format isn\'t valid.' }); return; }

            // Check the blur level.
            if (!s || s <= 0 || s > 100) { res.status(400).json({ success: false, message: 'The selected scale isn\'t correct.' }); return; }

            // Apply the new scale.
            processedImage = await scale(I.path, s)
        }

        ////////// STRETCH, COVER, CONTAIN, IN, OUT //////////

        // Apply a filter to know the resizing method.
        let typeSelected = Object.keys(req.body).filter(x => resizeTypes_itools.includes(x))[0] || null;

        // Verify the selected resizing type.
        if (!processedImage && !typeSelected) { res.status(400).json({ success: false, message: 'You haven\'t indicated a valid resizing type.' }); return; }

        if (!processedImage) {
            let size;

            // Check the JSON format.
            try { size = JSON.parse(req.body[typeSelected]); }
            catch (error) { res.status(400).json({ success: false, message: 'Your JSON format isn\'t valid.' }); return; }

            // Save the new parameters.
            size = { w: size.width || null, h: size.height || null };

            // Starts 'if' circuit.
            if (!size || (!size.w && !size.h)) { res.status(400).json({ success: false, message: 'The selected size isn\'t correct.' }); return; }
            if (size.h && size.h > 5000) { res.status(400).json({ success: false, message: 'The selected height isn\'t correct.' }); return; }
            if (size.w && size.w > 5000) { res.status(400).json({ success: false, message: 'The selected width isn\'t correct.' }); return; }

            // Apply the resize.
            processedImage = await resize(I.path, size, typeSelected)
        }

        // Verify the processed image.
        if (!processedImage) { res.status(400).json({ success: false, message: 'An error occurred while the image was being processed.' }); return; }

        // Read and return the processed image.
        await imageReturn(processedImage, res);

        console.log(processedImage)

        // On finish delete the files.
        del([I.path, processedImage]);
    } finally { del(I?.path); res.end(); }

});

module.exports = app;

