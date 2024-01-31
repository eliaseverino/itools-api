const clean = {};

const fs = require('fs');

// This function remove the 't' files.
clean.del = (t) => {
        if (typeof(t) !== "string") t.forEach(x => { clean.del(x); });
    else fs.unlink(t, e => { if (e) console.error(e); });
};


module.exports = clean;