import joi from 'joi';

export const urlsSchema = joi.object({
    url: joi.string().required().uri()
  });