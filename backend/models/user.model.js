import mongoose from "mongoose";

const UserSchma = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilPicture: {
      type: String,
      default: "",
    },
  },
  //createAT, updatedAd
  { timestamps: true }
);
const User = mongoose.model("User", UserSchma);

export default User;