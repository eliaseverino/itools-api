const { Router } = require('express');
const app = Router();

const upload = require('../../lib/multer'); // Our own Multer middleware for the file upload.
const vibrant = require('./controllers/vibrant'); // Vibrant controller.
const palette = require('./controllers/palette'); // Palette controller.
const { del } = require('../../lib/clean'); // File clean controller.

app.get('/', (req, res) => { res.json({ success: true }); });

// Get the dominant color from an image.
app.post('/vibrant', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files[0];
    try {
        let v = await vibrant.getVibrant(I.path);
        res.json({ success: true, vibrant: v });

        // On finish delete the file.
    } finally { del(I.path); }
});

// Get the muted color from an image.
app.post('/muted', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files[0];
    try {
        let m = await vibrant.getMuted(I.path);
        res.json({ success: true, muted: m });

        // On finish delete the file.
    } finally { del(I.path); }
});

// Get the full color palette from an image.
app.post('/palette', upload.any(), async (req, res) => {
    // Get the file.
    const I = req.files[0];
    try {
        let p = await palette.getPalette(I.path);
        res.json({ success: true, palette: p });

        // On finish delete the file.
    } finally { del(I.path); }
});

module.exports = app;
