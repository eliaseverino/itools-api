const express = require('express');
const app = express();
const morgan = require("morgan");
const path = require('path');

require('dotenv').config();
app.use(morgan("common"));

app.use('/color', require('./tools/color/'));

app.use('/*', require('./tools/error/'));

const P = process.env.PORT || 3000;
app.listen(P, () => { console.log(`Server running on port ${P}.`); });