const controller = {};

const { rgbToHex, rgbToHsl } = require('../../../lib/helpers');
const colorThief = require('colorthief');
const chroma = require('chroma-js');

// Get the color palette from the image.
controller.getPalette = async (i, c = 10) => {
    // The 'i' parameter corresponds to the image, and 'c' corresponds to the desired number of colors.

    // Get the color palette using ColorThief.
    const palette = await colorThief.getPalette(i, c);

    // Parse the result and return it.
    return palette.map(x => { return { rgb: x, hex: rgbToHex(x), hsl: rgbToHsl(x) } });
    // Here, we return both RGB and HEX values.
}

// Get colors that complement each other for uses like text or other overlaid elements.
controller.getChroma = async (color, c = 6, e = 'white') => {
    // The 'color' parameter corresponds to the base color, 'c' corresponds to the number of colors, and 'e' corresponds to the emphasis color.

    // Return the color processed by Chroma.
    // We use the emphasis color and obtain the desired number of colors.
    return chroma.scale([e, color]).colors(c).slice(0, -1);
    // We apply a slice to remove the last element from the array returned by Chroma, as it contains the original color, which we won't use.
}

module.exports = controller;
