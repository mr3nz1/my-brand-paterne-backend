import Joi, { Schema } from "joi";

const createArticleSchema: Schema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  content: Joi.string(),
  isPublished: Joi.boolean(),
  bannerImage: Joi.object(),
}).custom((value, helpers) => {
  const { title, description, content, bannerImage } = value;
  const requiredFields = [title, description, content, bannerImage];
  const allFieldsPresent = requiredFields.every(
    (field) => field !== undefined && field !== ""
  );

  if (!allFieldsPresent) {
    return {
      ...value,
      isPublished: false,
    };
  }

  return value;
});

const updateArticleSchema: Schema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  content: Joi.string(),
  isPublished: Joi.boolean(),
  bannerImage: Joi.object(),
});

export { createArticleSchema, updateArticleSchema };
