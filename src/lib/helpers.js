const colorConvert = require('color-convert');

const helpers = {};

// From array, convert the RGB color to HEX.
helpers.rgbToHex = (rgb) => { return colorConvert.rgb.hex(rgb); };

// From array, convert the RGB color to HSL (returns array).
helpers.rgbToHsl = (rgb) => { return colorConvert.rgb.hsl(rgb); };

module.exports = helpers;