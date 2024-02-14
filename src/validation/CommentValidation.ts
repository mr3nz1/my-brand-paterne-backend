import Joi, { Schema } from "joi";

const createCommentSchema: Schema = Joi.object({
  articleId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  comment: Joi.string().required(),
});

export default createCommentSchema;
