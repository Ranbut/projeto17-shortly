import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function Signup (req, res) {

    const { name, email, password} = req.body;

    try{

        const createdAt = dayjs().format("YYYY-MM-DD");

        await db.query(`INSERT INTO users (name , email, password, createdAt) VALUES ('${name}', '${email}', '${password}', '${createdAt}');`);
        res.sendStatus(201);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function Signin (req, res) {

    const { name, email } = req.body;

    try{

    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}