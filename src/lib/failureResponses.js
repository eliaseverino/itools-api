const failureResponses = {};

failureResponses.imageFound = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400).json({ success: false, message: 'Image not found.' });
        return false;
    }
    return true;
};

failureResponses.imageSize = async (i, res) => {
    const { getSize } = require('./image');
    const { IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT } = process.env || 5000;

    // Get the image size.
    const size = await getSize(i);

    // Check the image size.
    if (!size) {
        res.status(400).json({ success: false, message: `An error occurred while the image was being processed.` });
        return;
    } else if (size.w > IMAGE_MAX_WIDTH || size.h > IMAGE_MAX_HEIGHT) {
        res.status(400).json({ success: false, message: `The image exceeds ${IMAGE_MAX_WIDTH}px${IMAGE_MAX_HEIGHT}px (maximum size allowed).` });
        return;
    }
};

module.exports = failureResponses;