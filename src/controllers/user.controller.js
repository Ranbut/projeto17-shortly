import { db } from "../database/database.connection.js";

export async function UserMe (req, res) {

    try{

        const authorization = req.headers.authorization;
  
        const header = authorization.split(' ');
        const bearer = header[1];

        const userQuery = await db.query(`
        SELECT userGroup.id ,userGroup.name, SUM ("visitCount") AS "visitCount"
        FROM "shortsUrls"
        INNER JOIN "users" AS userGroup
        ON "shortsUrls"."userId" = userGroup."id"
        INNER JOIN "sessions" AS session
        ON "shortsUrls"."userId" = session."userId"
        WHERE session.token = $1
        GROUP BY userGroup.id, userGroup.name
        ;`, [bearer]);

        const urlsQuery = await db.query(`
        SELECT id, "shortUrl", url, "visitCount"
        FROM "shortsUrls"
        WHERE "shortsUrls"."userId" = $1;
        ;`, [userQuery.rows[0].id]);

        console.log(urlsQuery.rows);

        const bodyObj = {
            id: userQuery.rows[0].id,
            name: userQuery.rows[0].name,
            visitCount: userQuery.rows[0].visitCount,
            shortenedUrls: urlsQuery.rows
        };

        res.status(201).send(bodyObj);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}