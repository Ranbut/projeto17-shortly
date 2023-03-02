import { db } from "../database/database.connection.js";
import { urlsSchema } from '../schemas/urls.schema.js';

export async function validateUrlSchema (req, res, next) {

  try{
    
  const url = req.body;

  const { error } = urlsSchema.validate(url, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }

  next();
  }
  catch(err){
    res.status(500).send(`Erro no servidor: ${err.message}`);
}

};