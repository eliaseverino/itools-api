const express = require('express');
const app = express();
const morgan = require("morgan");
const path = require('path');

require('dotenv').config();
app.use(morgan("common"));

app.use('/color', require('./tools/color/'));
app.use('/blur', require('./tools/blur/'));

app.get('/*', (req, res) => { res.json({ success: false, message: 'Check the route.' }); });
app.post('/*', (req, res) => { res.json({ success: false, message: 'Check the route.' }); });

const P = process.env.PORT || 3000;
app.listen(P, () => { console.log(`Server running on port ${P}.`); });