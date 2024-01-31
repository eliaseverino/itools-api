const colorConvert = require('color-convert');

const helpers = {};

// From array, convert the RGB color to HEX.
helpers.rgbToHex = (rgb) => { return colorConvert.rgb.hex(rgb); };

// From array, convert the RGB color to HSL (returns array).
helpers.rgbToHsl = (rgb) => { return colorConvert.rgb.hsl(rgb); };


helpers.tempNameGenerator = (x) => {
  // Find the last position of point character in the string 'x'.
  const lPosition = x.lastIndexOf('.');
  return `${x.slice(0, lPosition)}_TEMP${x.slice(lPosition)}`;
}

module.exports = helpers;