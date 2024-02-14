import { ObjectId, UUID } from "mongodb";
import mongoose, { Schema, InferSchemaType } from "mongoose";

const commentSchema = new Schema(
  {
    articleId: {
      type: ObjectId,
      required: true,
    },
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

type CommentSchemaType = InferSchemaType<typeof commentSchema>;

const CommentModel = mongoose.model<CommentSchemaType>(
  "Comment",
  commentSchema
);

export default CommentModel;
