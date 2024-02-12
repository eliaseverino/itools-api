const { Router } = require('express');
const app = Router();

const upload = require('../../lib/multer'); // Our own Multer middleware for the file upload.
const { getMuted, getVibrant } = require('./controllers/vibrant'); // Vibrant controller.
const { getPalette } = require('./controllers/palette'); // Palette controller.
const { del } = require('../../lib/clean'); // File clean controller.

app.get('/', (req, res) => { res.json({ success: true }); });

// Get the dominant color from an image.
app.post('/vibrant', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;

    try {
        // Verify the image.
        if (!I) {
            res.status(400).json({ success: false, message: 'Image not found.' });
            return;
        }

        // Gettign the vibrant colors.
        let v = await getVibrant(I.path);

        // Return the results.
        res.json({ success: true, vibrant: v });

        // On finish delete the file.
        del(I.path);
    } finally { res.end(); }
});

// Get the muted color from an image.
app.post('/muted', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;

    try {
        // Verify the image.
        if (!I) {
            res.status(400).json({ success: false, message: 'Image not found.' });
            return;
        }

        // Gettign the muted colors.
        let m = await getMuted(I.path);

        // Return the results.
        res.json({ success: true, muted: m });

        // On finish delete the file.
        del(I.path);
    } finally { res.end(); }
});

// Get the full color palette from an image.
app.post('/palette', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files ? req.files[0] : false;

    try {
        // Verify the image.
        if (!I) {
            res.status(400).json({ success: false, message: 'Image not found.' });
            return;
        }

        // Gettign the full pallete.
        let p = await getPalette(I.path);

        // Return the results.
        res.json({ success: true, palette: p });

        // On finish delete the file.
        del(I.path);
    } finally { res.end(); }
});

module.exports = app;

