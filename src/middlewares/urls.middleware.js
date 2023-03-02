import { db } from "../database/database.connection.js";
import { urlsSchema } from '../schemas/urls.schema.js';

export async function validateUrlSchema (req, res, next) {

  try{

  const authorization = req.headers.authorization;

  const header = authorization.split(' ');
  const bearer = header[1];

  const url = req.body;

  const tokenQuery = await db.query(`SELECT token FROM sessions WHERE token=$1;`, [bearer]);

  const { error } = urlsSchema.validate(url, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }

  if (!authorization || tokenQuery.rowCount === 0) return res.sendStatus(401);

  next();
  }
  catch(err){
    res.status(500).send(`Erro no servidor: ${err.message}`);
}

};