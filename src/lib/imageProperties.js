const properties = {};
const sharp = require('sharp');
const helpers = require('./helpers');

properties.getSize = async (i) => {
    let info;

    // Read the image properties.
    await sharp(i).metadata()
        .then(metadata => {
            // Return maximun resolution.
            info = { h: metadata.height, w: metadata.width };
        }).catch(err => {
            console.log(err);
            info = false;
        });

    return info;
};

module.exports = properties;