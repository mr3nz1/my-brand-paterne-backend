import Joi, { Schema } from "joi";

const registerUserSchema: Schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginUserSchema: Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerUserSchema, loginUserSchema };
