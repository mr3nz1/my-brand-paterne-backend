import Joi, { Schema } from "joi";

const createArticleSchema: Schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  content: Joi.string().required(),
  isPublished: Joi.boolean().required(),
});

const updateArticleSchema: Schema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  content: Joi.string(),
  isPublished: Joi.boolean(),
});

export { createArticleSchema, updateArticleSchema };
