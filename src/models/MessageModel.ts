import { string } from "joi";
import mongoose, {
  Schema,
  Document,
  MongooseError,
  InferSchemaType,
} from "mongoose";

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

type MessageSchemaType = InferSchemaType<typeof messageSchema>;

const MessageModel = mongoose.model<MessageSchemaType>(
  "Message",
  messageSchema
);

export default MessageModel;
