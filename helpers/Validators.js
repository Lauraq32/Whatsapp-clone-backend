const User = require('../models/user');

const emailExists = async( email = '' ) => {
    const usedEmail = await User.findOne({ email });
    if (usedEmail) {
        throw new Error(`there is another account registered with this email, ${ email }`);
    }
}

module.exports = {
    emailExists,
}