const sharp = require('sharp');

const { getSize } = require('../../../lib/image');
const { tempNameGenerator } = require('../../../lib/helpers');

const controller = {};

controller.resizeTypes = [{ itools: 'stretch', sharp: 'fill' }, { itools: 'cover', sharp: 'cover' }, { itools: 'contain', sharp: 'contain' }, { itools: 'in', sharp: 'inside' }, { itools: 'out', sharp: 'outside' }];
controller.resizeTypes_itools = controller.resizeTypes.map(x => x.itools);
controller.resizeTypes_sharp = controller.resizeTypes.map(x => x.sharp);

controller.resize = async (i, s, t) => {
    // Get the image size.
    const size = await getSize(i);

    // Generate a new temp name.
    const temp = await tempNameGenerator(i);

    // Set the new properties.
    s.w = s.w || size.w;
    s.h = s.h || size.h;

    // Apply the configurations using Sharp.
    try {
        await sharp(i).resize(s.w, s.h, { fit: controller.resizeTypes.filter(x => x.itools === t)[0].sharp }).toFile(temp);
        return temp;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = controller;