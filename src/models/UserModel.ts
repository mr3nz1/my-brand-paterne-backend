import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createJWT(): string;
  isPasswordCorrect(): boolean;
}

const userSchema = new Schema<UserDocument>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
      email: this.email,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
