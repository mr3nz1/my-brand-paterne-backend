import Joi, { Schema } from "joi";

const MessageValidationSchema: Schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(4).required(),
});

export default MessageValidationSchema;
