const { Schema, model } = require('mongoose');
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'the password is mandatory'],
    },
    phonenumber: {
        type: String,
        required: [true, 'need a phone number to proceed'],
        unique: [true], 
    },
    profilepicture: {
        type: String,
        default: "/images/no-image-icon-md.png"
    },
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = model('User', UserSchema);
