const Messages = require("../models/message");
const user = require("../models/user");

const MessageController = {};

MessageController.create = async (req, res) => {
  const { userId } = req;

  const messages = new Messages ({
      from: userId,
      receiveto: req.body.receiveto,
      message: req.body.message,
  });

  try {
    const result = await messages.save();
    const userObj = result.toObject();

    return res.status(201).json({
      ...userObj,
   });
  }
  catch(error) {
    console.log(`an error occurred ${err}`);
    
    return res.status(500).json({
      error: err,
    });
  }
};

MessageController.getMessages = async (req, res) => {
  try {
    const { userId } = req;
    const messages = await Messages.find({$or: [{receiveto: userId}, {from: userId}]});
    
    return res.status(200).json({
      messages
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = MessageController;