import { string } from "joi";
import mongoose, {
  Schema,
  Document,
  MongooseError,
  InferSchemaType,
} from "mongoose";

const messageSchema = new Schema(
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
  {
    timestamps: true,
  }
);

type MessageSchemaType = InferSchemaType<typeof messageSchema>;

const MessageModel = mongoose.model<MessageSchemaType>(
  "Message",
  messageSchema
);

export default MessageModel;
