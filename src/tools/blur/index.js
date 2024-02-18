const { Router } = require('express');
const app = Router();

const upload = require('../../lib/multer'); // Our own Multer middleware for the file upload.
const { del } = require('../../lib/clean'); // File clean controller.
const { imageReturn, getSize } = require('../../lib/image');
const { imageFound } = require('../../lib/failureResponses');

const { blur } = require('./controllers/blur');

app.post('/:level', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;
    const L = Number(req.params.level);

    // Get the image size.
    const size = await getSize(I.path);

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    try {
        // Check the image size.
        if (!size) {
            res.status(400).json({ success: false, message: 'An error occurred while the image was being processed.' });
            return;
        } else if (size.w > 5000 || size.h > 5000) {
            res.status(400).json({ success: false, message: 'The image exceeds 5000x5000px (maximum size allowed).' });
            return;
        }

        // Check the blur level.
        if (!L || L <= 0 || L > 100) {
            res.status(400).json({ success: false, message: 'The blur level isn\'t correct.' });
            return;
        }

        // Apply blur.
        const processedImage = await blur(I.path, L);

        // Read and return the processed image.
        await imageReturn(processedImage, res);

        // On finish delete the files.
        del([processedImage, I.path]);
    } finally { del(I?.path); res.end(); }
});

app.post('/', upload.any(), async (req, res) => {

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Get the file.
    const I = req.files ? req.files[0] : false;
    const L = Number(req.body.level);

    // Get the image size.
    const size = await getSize(I.path);

    try {
        // Check the image size.
        if (!size) {
            res.status(400).json({ success: false, message: 'An error occurred while the image was being processed.' });
            return;
        } else if (size.w > 5000 || size.h > 5000) {
            res.status(400).json({ success: false, message: 'The image exceeds 5000x5000px (maximum size allowed).' });
            return;
        }

        // Check the blur level.
        if (!L || L <= 0 || L > 100) {
            res.status(400).json({ success: false, message: 'The blur level isn\'t correct.' });
            return;
        }

        // Apply blur.
        const processedImage = await blur(I.path, L);

        // Read and return the processed image.
        await imageReturn(processedImage, res);

        // On finish delete the files.
        del([processedImage, I.path]);
    } finally { del(I?.path); res.end(); }
});

module.exports = app;