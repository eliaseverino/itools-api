const { Router } = require('express');
const app = Router();

const upload = require('../../lib/multer'); // Our own Multer middleware for the file upload.
const { getMuted, getVibrant } = require('./controllers/vibrant'); // Vibrant controller.
const { getPalette } = require('./controllers/palette'); // Palette controller.
const { del } = require('../../lib/clean'); // File clean controller.
const { imageFound } = require('../../lib/failureResponses');

// Defines the list of modes.
const types = [
    { name: 'muted', call: getMuted },
    { name: 'vibrant', call: getVibrant },
    { name: 'palette', call: getPalette },
];

app.post('/', upload.any(), async (req, res) => {

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Get the file.
    const I = req.files[0];

    // Get the request type.
    let selected = req.body.type && typeof (req.body.type) === 'object' ? JSON.parse(req.body.type) : "full";

    // Verify and set the selected color type.
    if (selected.includes('full') || selected.includes('all') || selected.includes('complete')) selected = types;
    else if (selected !== null && typeof (selected) === 'object') selected = types.filter(x => selected.includes(x.name));
    else if (selected !== null) selected = types.filter(x => selected === x.name)[0];
    else selected = types;

    try {
        // To save the final return.
        let result = {};

        // For each mode, we apply the respective function.
        for (const x of selected) result[x.name] = await x.call(I.path);

        // Return the results.
        res.json(result);

    } finally {
        del(I.path); // On finish delete the file.
        res.end();
    }
});

// Get the dominant color from an image.
app.post('/full', upload.any(), async (req, res) => {

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Get the file.
    const I = req.files ? req.files[0] : false;
    const selected = types;

    try {
        // To save the final return.
        let result = {};

        // For each mode, we apply the respective function.
        for (const x of selected) result[x.name] = await x.call(I.path);

        // Return the results.
        res.json(result);

    } finally {
        del(I.path); // On finish delete the file.
        res.end();
    }
});

// Get the dominant color from an image.
app.post('/complete', upload.any(), async (req, res) => {

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Get the file.
    const I = req.files ? req.files[0] : false;
    const selected = types;

    try {
        // To save the final return.
        let result = {};

        // For each mode, we apply the respective function.
        for (const x of selected) result[x.name] = await x.call(I.path);

        // Return the results.
        res.json(result);

    } finally {
        del(I.path); // On finish delete the file.
        res.end();
    }
});

// Get the dominant color from an image.
app.post('/vibrant', upload.any(), async (req, res) => {

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Get the file.
    const I = req.files ? req.files[0] : false;

    try {
        // Getting the vibrant colors.
        let v = await getVibrant(I.path);

        // Return the results.
        res.json({ vibrant: v });

    } finally {
        del(I.path); // On finish delete the file.
        res.end();
    }
});

// Get the muted color from an image.
app.post('/muted', upload.any(), async (req, res) => {

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Get the file.
    const I = req.files ? req.files[0] : false;

    try {
        // Getting the muted colors.
        let m = await getMuted(I.path);

        // Return the results.
        res.json({ muted: m });

    } finally {
        del(I.path); // On finish delete the file.
        res.end();
    }
});

// Get the full color palette from an image.
app.post('/palette', upload.any(), async (req, res) => {

    // Verify the image.
    if (!(await imageFound(req, res))) return;

    // Get the file.
    const I = req.files ? req.files[0] : false;

    try {
        // Getting the full pallete.
        let p = await getPalette(I.path);

        // Return the results.
        res.json({ palette: p });

    } finally {
        del(I.path); // On finish delete the file.
        res.end();
    }
});

module.exports = app;

