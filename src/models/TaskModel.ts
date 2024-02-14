import mongoose, { Schema, Document, mongo } from "mongoose";

interface TaskDocument extends Document {
  title: string;
  content: string;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel;
