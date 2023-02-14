import joi from 'joi';

export const signinSchema = joi.object({
    email: joi.string().required().email({ tlds: { allow: false } }),
    password: joi.string().required()
  });

export const signupSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email({ tlds: { allow: false } }),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
  });