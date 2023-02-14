import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid';
import dayjs from "dayjs";

export async function CreateUrl (req, res) {
    const { url } = req.body;

    try{
        let urlKey = nanoid(8);
        const createdAt = dayjs().format("YYYY-MM-DD");

        await db.query(`INSERT INTO "shortUrls" ("shortUrl", url, "createdAt") VALUES ('${urlKey}', '${url}', '${createdAt}');`);
        const createId = (await db.query(`SELECT * FROM "shortUrls" ORDER BY ID DESC LIMIT 1;`)).rows[0].id;
        res.status(201).send({id: createId, shortUrl: urlKey});
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function GetUrl (req, res) {

    const { id } = req.params;

    try{
        const result = await db.query(`SELECT id, "shortUrl", url FROM "shortUrls" WHERE id=${id};`);

        if (result.rowCount === 0) return res.sendStatus(404);

        res.status(200).send(result.rows[0]);

    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function OpenShortUrl (req, res) {

    const { shortUrl } = req.query;

    try{

    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function DeleteUrl (req, res) {

    const { id } = req.query;

    try{

    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}