import db from "../db.js";

async function addShortURL(url, shortURL, userId){
    return(
        db.query(`
            INSERT INTO urls(url, "shortUrl", "userId")
            VALUES ($1, $2, $3)
        `, [url, shortURL, userId])
    );
}

async function findURLById(id){
    return db.query("SELECT * FROM urls WHERE id = $1", [id]);
}
//Faz a busca usando a url encurtada
async function findByShortenedURL(shortURL){
    return(
        db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortURL])
    );
}

async function countNumberOfVisitsToLink(urlId){
    return(
        db.query(`
            UPDATE urls
            SET "visitCount" = "visitCount" + 1
            WHERE id = $1
        `, [urlId])
    );
}

async function deleteURL(id){
    return db.query("DELETE FROM urls WHERE id = $1", [id]);
}

async function getNumberVisitByUser(userId){
    return(
        db.query(`
            SELECT SUM(u."visitCount")
            FROM urls u
            WHERE u."userId" = $1
        `, [userId])
    );
}

async function getURLSByUser(userId){
    return(
        db.query(
            `SELECT * FROM urls WHERE urls."userId" = $1`
        , [userId])
    );
}

const urlRepository = {
    addShortURL,
    findURLById,
    deleteURL,
    findByShortenedURL,
    countNumberOfVisitsToLink,
    getNumberVisitByUser,
    getURLSByUser
};

export default urlRepository;