import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import userRepository from "../repositories/userRepository.js";
import sessionRepository from "../repositories/sessionRepository.js";

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

export async function signIn(req, res){
    const user = req.body;

    //Efetua a busca de usuario por email
    const findUser = await userRepository.getUserByEmail(user.email);
    if(findUser.rowCount === 0){
        return res.sendStatus(401); //Não autorizado
    }

    if(bcrypt.compareSync(user.password, findUser.password)){
        const token = uuid();
        await sessionRepository.createSession(findUser, token);
        return res.send(token);
    }
}