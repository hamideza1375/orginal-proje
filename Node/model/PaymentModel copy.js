const mongoose = require('mongoose');


const SenderMsg = new mongoose.Schema({
  name: String,
  gender: Number,
});


const ChatMessageModel = new mongoose.Schema({
  msgId: Number,
  roomNumber: String,
  msg: String,
  sender: {SenderMsg},
});



const ChatUserModel = new mongoose.Schema({
  usId: { type: mongoose.Schema.Types.ObjectId, ref: "usId" },
  nickname : Number,
  gender : String,
  roomNumber : String,
});
