import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid';

export async function CreateUrl (req, res) {
    const { url } = req.body;

    const authorization = req.headers.authorization;

    try{

        const header = authorization.split(' ');
        const bearer = header[1];
        const userId = (await db.query(`SELECT id FROM sessions WHERE token=$1;`, [bearer])).rows[0].id;

        let urlKey = nanoid(8);
        
        await db.query(`INSERT INTO "shortsUrls" ("shortUrl", url, "userId", "visitCount") VALUES ($1, $2, $3, $4);`, [urlKey, url, userId, 0]);
        const createId = (await db.query(`SELECT * FROM "shortsUrls" ORDER BY ID DESC LIMIT 1;`)).rows[0].id;
        res.status(201).send({id: createId, shortUrl: urlKey});
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function GetUrl (req, res) {

    const { id } = req.params;

    try{
        const result = await db.query(`SELECT id, "shortUrl", url FROM "shortsUrls" WHERE id=$1;`, [id]);

        if (result.rowCount === 0) return res.sendStatus(404);

        res.status(200).send(result.rows[0]);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function OpenShortUrl (req, res) {

    const { shortUrl } = req.params;

    try{
        const result = await db.query(`SELECT * FROM "shortsUrls" WHERE "shortUrl" = $1;`, [shortUrl]);

        if (result.rowCount === 0) return res.sendStatus(404);

        await db.query(`UPDATE "shortsUrls" SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1;`, [shortUrl])

        res.redirect(302, `${result.rows[0].url}`);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}

export async function DeleteUrl (req, res) {

    const { id } = req.params;

    try{
        const authorization = req.headers.authorization;

        if (!authorization) return res.sendStatus(401);

        const header = authorization.split(' ');
        const bearer = header[1];

        const tokenQuery = await db.query(`SELECT "userId", token FROM sessions WHERE token = $1;`, [bearer]);

        if (!authorization || tokenQuery.rowCount === 0) return res.sendStatus(401);

        const shortUrl = (await db.query(`SELECT * FROM "shortsUrls" WHERE id = $1`, [id])).rows[0];

        if (!shortUrl) return res.sendStatus(404);

        console.log(shortUrl.userId)

        if (shortUrl.userId !== tokenQuery.rows[0].userId) return res.sendStatus(401);

        await db.query(`DELETE FROM "shortsUrls" WHERE id=$1`, [id]);

        res.sendStatus(204);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}