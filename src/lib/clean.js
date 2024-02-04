const clean = {};

const fs = require('fs');

// This function remove the 't' files.
clean.del = async (t) => {
    if (t)
        if (typeof (t) !== "string") await t.forEach(async x => { if (await fs.existsSync(x)) clean.del(x); });
        else if (await fs.existsSync(t)) fs.unlink(t, err => { if (err) console.error(err); });
};


module.exports = clean;