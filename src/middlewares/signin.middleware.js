import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { signinSchema } from '../schemas/signin.schema.js';

export async function validateSigninSchema (req, res, next) {

  const sign = req.body;

  const { error } = signinSchema.validate(sign, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }

  const userQuery = await db.query(`SELECT * FROM users WHERE email='${sign.email}';`);
  const result = userQuery.rows[0];

  if (userQuery.rowCount === 0) return res.sendStatus(401);

  const passwordMatch = await bcrypt.compare(sign.password, result.password);

  if (!passwordMatch) return res.sendStatus(401);

  next();
};