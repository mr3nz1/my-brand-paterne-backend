import Joi, { Schema } from "joi";

const createTaskUserSchema: Schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const updateTaskUserSchema: Schema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
});
export { createTaskUserSchema, updateTaskUserSchema };
