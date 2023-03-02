import { db } from "../database/database.connection.js";

export async function validateUserMe (req, res, next) {

    try{
  
    const authorization = req.headers.authorization;
  
    const header = authorization.split(' ');
    const bearer = header[1];
  
    const tokenQuery = await db.query(`SELECT token FROM sessions WHERE token=$1;` , [bearer]);
  
    if (!authorization || tokenQuery.rowCount === 0) return res.sendStatus(401);
  
    next();
    }
    catch(err){
      res.status(500).send(`Erro no servidor: ${err.message}`);
  }
  };