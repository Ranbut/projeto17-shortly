import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { signinSchema, signupSchema } from '../schemas/sign.schema.js';

export async function validateSigninSchema (req, res, next) {

  const sign = req.body;

  const { error } = signinSchema.validate(sign, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }

  const userQuery = await db.query(`SELECT * FROM users WHERE email=$1;`, [sign.email]);
  const result = userQuery.rows[0];

  if (userQuery.rowCount === 0) return res.sendStatus(401);

  const passwordMatch = await bcrypt.compare(sign.password, result.password);

  if (!passwordMatch) return res.sendStatus(401);

  next();
};

export async function validateSignupSchema (req, res, next) {

  const sign = req.body;

  const { error } = signupSchema.validate(sign, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }

  const emailExist = await db.query(`SELECT email FROM users WHERE email=$1;`, [sign.email]);

  if(emailExist.rowCount !== 0) return res.sendStatus(409);

  if(sign.password !== sign.confirmPassword) return res.sendStatus(422);

  next();
};