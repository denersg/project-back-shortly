import bcrypt from "bcrypt";
import db from "../db.js";

async function getUserByEmail(email){
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
}
// Cria usuario e o adiciona no banco de dados
async function addUserToDatabase(name, email, password){
    const passwordHash = bcrypt.hashSync(password, 10);

    return(
        db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `, [name, email, passwordHash])
    );
}

async function getUserById(id){
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
}

//Busca URLs do usuário, formatando-as conforme solicitado
async function getFormattedUserURLs(userId){
    return(
        db.query(`
            SELECT
                u.id, u."shortUrl", u.url, u."visitCount"
            FROM
                urls u
            WHERE
                u."userId" = $1
        `, [userId])
    );
}

async function getURLsRankingByUser(){
    return(
        db.query(`
            SELECT
                usr.id, usr.name, COUNT(u.id) AS "linksCount", SUM(u."visitCount") AS "visitCount"
            FROM
                urls u
            JOIN
                users usr ON u."userId" = usr.id
            GROUP BY
                usr.id
            ORDER BY
                "visitCount" DESC
            LIMIT
                10
        `)
    );
}

const userRepository = {
    getUserByEmail,
    addUserToDatabase,
    getUserById,
    getURLsRankingByUser,
    getFormattedUserURLs
};

export default userRepository;