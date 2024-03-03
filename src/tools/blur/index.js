const { Router } = require('express');
const app = Router();

const upload = require('../../lib/multer'); // Our own Multer middleware for the file upload.
const { del } = require('../../lib/clean'); // File clean controller.
const { imageReturn, getSize } = require('../../lib/image');
const { imageFound, imageSize } = require('../../lib/failureResponses');

const { blur } = require('./controllers/blur');

app.post('/:level', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;
    const L = Number(req.params.level);

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Verify the image size.
    if (!(await imageSize(I.path, res))) return;

    try {
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
    // Get the file.
    const I = req.files ? req.files[0] : false;

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Verify the image size.
    if (!(await imageSize(I.path, res))) return;

    // Get the selected blur level.
    const L = Number(req.body.level);

    try {
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