const blur = {};
const sharp = require('sharp');
const helpers = require('../../../lib/helpers');

blur.full = async (i, l) => {

    // Generate new name with the 'temp' word to know that is a temporal file.
    const t = await helpers.tempNameGenerator(i);

    try {
        // Apply blur on the image with Sharp.
        await sharp(i).blur(l).toFile(t);
        return t;
    } catch (err) {
        console.log(err);
        return false;
    }
};



module.exports = blur;