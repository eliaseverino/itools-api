const sharp = require('sharp');

const { getSize } = require('../../../lib/image');
const { tempNameGenerator } = require('../../../lib/helpers');

const controller = {};

controller.scale = async (i, s) => {
    // Getting the original image size.
    const originalSize = await getSize(i);

    // Saving the new image size.
    const newSize = { w: originalSize.w * s, h: originalSize.h * s };

    // Get a new temp name for the new generated image.
    const t = await tempNameGenerator(i);

    // Apply the configuration using Sharp.
    try {
        await sharp(i).resize(newSize.w, newSize.h).toFile(t);
        return t;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = controller;