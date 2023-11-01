import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema<models.User>(
  {
    firstName: {
      type: String,
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      
    },
    role: {
      type: String,
      enum: ["member", "librarian", "admin"],
      default: "member",
    },
    email: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: Number,
    isPhoneNumberVerified: Boolean,
    username: String,
    hashedPassword: String,
    gender: {
      type: String,
      enum: ["male", "female"],
      
    },
    birthdate: {
      type: Date,
      default: Date.now    
    },
    images: {
      profile: String,
    },
    bio: String,
    homeTown: String,
    livesIn: String,
    onboarded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<models.User> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
