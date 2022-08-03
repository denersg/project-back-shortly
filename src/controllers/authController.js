import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";

export async function signUp(req, res){
    const user = req.body;

    try{
        //Verifica se usuário com o email já existe
        const result = await userRepository.getUserByEmail(user.email);
        if(result.rowCount > 0){
            return res.sendStatus(409);//Conflito
        }
        
        await userRepository.addUserToDatabase(user.name, user.email, user.password);

        res.sendStatus(201);
        
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);//Erro do servidor
    }
}

export async function signIn(req, res){}