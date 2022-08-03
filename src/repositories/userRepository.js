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

const userRepository = {
    getUserByEmail,
    addUserToDatabase,
    getUserById
};

export default userRepository;