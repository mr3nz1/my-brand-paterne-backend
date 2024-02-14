import Joi, { Schema } from "joi";

const articleSchema: Schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  content: Joi.string().required(),
});
