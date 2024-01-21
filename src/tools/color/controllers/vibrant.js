const controller = {};

const vibrant = require('node-vibrant');

const { rgbToHex, rgbToHsl } = require('../../../lib/helpers');

// Create a small helper function that will obtain information about the dominant/weak colors of the image.
const getVibrant_helper = (i) => {
    return vibrant.from(i)
        .getPalette()
        .then((p) => { return p; })
        .catch((e) => { console.error(e); return e; });
};

// Get the colors and return the dominant color, parsing the result.
controller.getVibrant = async (i) => {
    const x = await getVibrant_helper(i);

    return {
        normal: {
            rgb: x.Vibrant.rgb.map(value => Math.round(value)),
            hex: rgbToHex(x.Vibrant.rgb),
            hsl: rgbToHsl(x.Vibrant.rgb)
        },
        dark: {
            rgb: x.DarkVibrant.rgb.map(value => Math.round(value)),
            hex: rgbToHex(x.DarkVibrant.rgb),
            hsl: rgbToHsl(x.DarkVibrant.rgb)
        },
        light: {
            rgb: x.LightVibrant.rgb.map(value => Math.round(value)),
            hex: rgbToHex(x.LightVibrant.rgb),
            hsl: rgbToHsl(x.LightVibrant.rgb)
        }
    };
}

// Get the colors and return the muted color, parsing the result.
controller.getMuted = async (i) => {
    const x = await getVibrant_helper(i);

    return {
        normal: {
            rgb: x.Muted.rgb.map(value => Math.round(value)),
            hex: rgbToHex(x.Muted.rgb),
            hsl: rgbToHsl(x.Muted.rgb)
        },
        dark: {
            rgb: x.DarkMuted.rgb.map(value => Math.round(value)),
            hex: rgbToHex(x.DarkMuted.rgb),
            hsl: rgbToHsl(x.DarkMuted.rgb)
        },
        light: {
            rgb: x.LightMuted.rgb.map(value => Math.round(value)),
            hex: rgbToHex(x.LightMuted.rgb),
            hsl: rgbToHsl(x.LightMuted.rgb)
        }
    };
}

module.exports = controller;
