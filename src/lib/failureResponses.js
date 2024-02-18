const failureResponses = {};

failureResponses.imageFound = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        res.status(400).json({ success: false, message: 'Image not found.' });
        return false;
    }
    return true;
};

module.exports = failureResponses;