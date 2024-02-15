import mongoose, { InferSchemaType, Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    bannerImageUrl: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

type ArticleSchemaType = InferSchemaType<typeof articleSchema>;

const ArticleModel = mongoose.model<ArticleSchemaType>(
  "Article",
  articleSchema
);

export default ArticleModel;
