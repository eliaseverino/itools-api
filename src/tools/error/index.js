const { Router } = require('express');
const app = Router();

app.get('/*', (req, res) => { res.json({ success: false }); });
app.post('/*', (req, res) => { res.json({ success: false }); });

module.exports = app;

