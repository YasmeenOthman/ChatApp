const Messages = require("../models/messageModel");

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    /* 
    Uses Mongoose to query the database for messages between two users (from and to).
    $all ensures that both from and to values are present in the users array of each message.
    Sorts the retrieved messages by the updatedAt field in ascending order.
    */
    const messages = await Messages.find({
      users: {
        $all: [senderId, receiverId],
      },
    }).sort({ updatedAt: 1 });

    /* 
    Project the messages for client consumption
    Maps over the retrieved messages to create a new array (projectedMessages) with a modified structure.
    fromSelf is a boolean indicating whether the message sender is the current user or not 
    */
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === senderId,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (err) {
    console.log(err);
  }
};

const addMessage = async (req, res, next) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Create a new message
    const data = await Messages.create({
      message: { text: message },
      users: [senderId, receiverId],
      sender: senderId,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getMessages, addMessage };
