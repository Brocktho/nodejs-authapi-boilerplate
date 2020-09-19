const bcrypt = require("bcryptjs");

const comparePass = async (pass, hash) => {
    const isValid = await bcrypt.compare(pass, hash);
    return isValid;
};

module.exports = comparePass;
