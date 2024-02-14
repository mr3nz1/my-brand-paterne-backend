import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ArticleDocument extends Document {
  title: string;
  description: string;
  content: string;
  bannerImageUrl: string;
}

const articleSchema = new Schema<ArticleDocument>({
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
});

const ArticleModel = mongoose.model<ArticleDocument>("User", articleSchema);
