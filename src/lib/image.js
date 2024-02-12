const lib = {};
const sharp = require('sharp');
const fs = require('fs');

lib.getSize = async (i) => {
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

lib.imageReturn = async (i, res) => {

    // Read the result image.
    const buffer = await fs.readFileSync(i);

    // Return the image buffer.
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length
    }).end(buffer);
};

module.exports = lib;