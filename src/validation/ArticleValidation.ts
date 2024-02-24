import Joi, { Schema } from "joi";

const createArticleSchema: Schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  content: Joi.string().required(),
  isPublished: Joi.boolean().required(),
  bannerImage: Joi.object().required(),
});

const updateArticleSchema: Schema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  content: Joi.string(),
  isPublished: Joi.boolean(),
  bannerImage: Joi.object(),
});

export { createArticleSchema, updateArticleSchema };
