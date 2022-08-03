import db from "../db.js";

async function createSession(user, token){
    return(
        db.query(`
            INSERT INTO sessions (token, "userId")
            VALUES ($1, $2)
        `, [token, user.id])
    );
}

const sessionRepository = {
    createSession
};

export default sessionRepository;