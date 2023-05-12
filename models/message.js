const { Schema, model } = require('mongoose');
const MessageSchema = Schema({
    from: {
        ref: "User",
        type: Schema.Types.ObjectId, 
        required: [true, 'from is required']
    },
    receiveto: {
        ref: "User",
        type: Schema.Types.ObjectId, 
        required: [true, 'receiveto is required']
    },
    message: {
        type: String, 
        required: [true, 'message is required']
    },

});

module.exports = model('Message', MessageSchema);