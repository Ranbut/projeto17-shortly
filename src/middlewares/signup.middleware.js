import { db } from "../database/database.connection.js";
import { signupSchema } from '../schemas/signup.schema.js';

export async function validateSignupSchema (req, res, next) {

      const sign = req.body;

      const { error } = signupSchema.validate(sign, { abortEarly: false });

      if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
      }

      const emailExist = await db.query(`SELECT email FROM users WHERE email='${sign.email}';`);

      if(emailExist.rowCount !== 0) return res.sendStatus(409);

      if(sign.password !== sign.confirmPassword) return res.sendStatus(422);

      next();
};