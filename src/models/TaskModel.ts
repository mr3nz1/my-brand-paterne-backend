import mongoose, { Schema, Document, mongo, InferSchemaType } from "mongoose";

const taskSchema = new Schema(
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

type TaskSchemaType = InferSchemaType<typeof taskSchema>;

const TaskModel = mongoose.model<TaskSchemaType>("Task", taskSchema);

export default TaskModel;
