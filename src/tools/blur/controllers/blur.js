const controller = {};
const sharp = require('sharp');
const { tempNameGenerator } = require('../../../lib/helpers');

controller.blur = async (i, l) => {

    // Generate new name with the 'temp' word to know that is a temporal file.
    const t = await tempNameGenerator(i);

    try {
        // Apply blur on the image with Sharp.
        await sharp(i).blur(l).toFile(t);
        return t;
    } catch (err) {
        console.log(err);
        return false;
    }
};



module.exports = controller;