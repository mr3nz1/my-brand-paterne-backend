import { string } from "joi";
import mongoose, { Schema, Document, MongooseError } from "mongoose";

interface MessageDocument extends Document {
  name: string;
  email: string;
  message: string;
}

const messageSchema = new Schema<MessageDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);
