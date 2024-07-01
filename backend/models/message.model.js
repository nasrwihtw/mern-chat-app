import mongoose from "mongoose";

const MessageSchma = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  },
  //createAT, updatedAd
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchma);

export default Message;
