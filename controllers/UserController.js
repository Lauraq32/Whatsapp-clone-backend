const User = require("../models/user");
const crypto = require("crypto");
const { SECRETORPRIVATEKEY } = require("../config");
const { getJWT } = require("../helpers/generate-jwt");

const UserController = {};

UserController.create = async (req, res) => {
  const sha256Hasher = crypto.createHmac("sha256", SECRETORPRIVATEKEY);
  const hash = sha256Hasher.update(req.body.password).digest("hex");

  const users = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    phonenumber: req.body.phonenumber,
  });

  try {
    const result = await users.save();
    const userObj = result.toObject();
    const token = await getJWT(userObj._id);

    delete userObj.password;
  
    return res.status(201).json({
      ...userObj,
      token,
    });
  } catch (err) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

UserController.getContacts = async (req, res) => {
  try {
    const { userId } = req;
    const authUser = await User.findById(userId).populate("contacts");

    return res.status(200).json({
      contacts: authUser.contacts
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

UserController.addContact = async (req, res) => {
  const { phonenumber } = req.body;
  const { userId  } = req;

  try {
    const user = await User.findOne({ phonenumber });

    if (!user) {
      return res.status(404).json({
        msg: "contact not found",
      });
    }

    const authUser = await User.findById(userId);
    console.log("AUTH USER", authUser);
    const userObj = user.toObject();

    authUser.contacts.push(userObj._id);
    await authUser.save();

    delete userObj.password;

    return res.status(200).json({
      contact: userObj,
    });

  } catch (error) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

UserController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const sha256Hasher = crypto.createHmac("sha256", SECRETORPRIVATEKEY);
    const hash = sha256Hasher.update(password).digest("hex");

    const user = await User.findOne({ email, password: hash });

    if (!user) {
      return res.status(401).json({
        msg: "Invalid credentials",
      });
    }
    const token = await getJWT(user._id);
    const userObj = user.toObject();

    delete userObj.password;

    res.json({
      ...userObj,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "talk to admin",
    });
  }
};

module.exports = UserController;
