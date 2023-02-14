import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";

export async function Signup (req, res) {

    const { name, email, password } = req.body;

    try{

        const createdAt = dayjs().format("YYYY-MM-DD");
        const passwordHashed = await bcrypt.hash(password, 10);

        console.log(passwordHashed.length)

        await db.query(`INSERT INTO users (name , email, password, "createdAt") VALUES ('${name}', '${email}', '${passwordHashed}', '${createdAt}');`);
        res.sendStatus(201);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function Signin (req, res) {

    const { email } = req.body;

    try{
        const emailQuery = await db.query(`SELECT id FROM users WHERE email='${email}';`);
        const result = emailQuery.rows[0].id;
    
        const token = uuid();
      
        await db.query(`INSERT INTO sessions ("userId" , token) VALUES ('${result}', '${token}');`);
        res.status(200).send({ token });
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}