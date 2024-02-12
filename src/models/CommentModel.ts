import mongoose, { Schema, Document } from "mongoose";

interface CommentDocument extends Document {
  name: string;
  email: string;
  comment: string;
}

const commentSchema = new Schema<CommentDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel;
