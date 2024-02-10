import mongoose, { Schema, Document } from "mongoose";

interface ArticleDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const articleSchema = new Schema<ArticleDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const ArticleModel = mongoose.model<ArticleDocument>("User", articleSchema);

export default ArticleModel;
