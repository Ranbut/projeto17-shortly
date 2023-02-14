import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid';
import dayjs from "dayjs";

export async function CreateUrl (req, res) {
    const { url } = req.body;

    const authorization = req.headers.authorization;

    try{

        const header = authorization.split(' ');
        const bearer = header[1];
        const userId = (await db.query(`SELECT id FROM sessions WHERE token='${bearer}';`)).rows[0].id;

        let urlKey = nanoid(8);
        const createdAt = dayjs().format("YYYY-MM-DD");
        
        await db.query(`INSERT INTO "shortUrls" ("shortUrl", url, "createdAt", "userId") VALUES ('${urlKey}', '${url}', '${createdAt}', ${userId});`);
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

    const { id } = req.params;
    const authorization = req.headers.authorization;

    const header = authorization.split(' ');
    const bearer = header[1];

    try{
        const tokenQuery = await db.query(`SELECT token FROM sessions WHERE token='${bearer}';`);

        if (!authorization || tokenQuery.rowCount === 0) return res.sendStatus(401);

        const shortUrl = (await db.query(`SELECT * FROM "shortUrls" WHERE id = ${id}`)).rows[0];

        if (!shortUrl) return res.sendStatus(404);

        await db.query(`DELETE FROM "shortUrls" WHERE id=${id}`);

        res.sendStatus(200);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}