const clean = {};

const fs = require('fs');

clean.del = (path, folder = false) => {
    fs.unlink(path, e => { if (e) console.error(e); });
};


module.exports = clean;