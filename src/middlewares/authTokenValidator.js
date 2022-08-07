import sessionRepository from "../repositories/sessionRepository.js";
import userRepository from "../repositories/userRepository.js";

export async function tokenValidator(req, res, next){
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if(!token){
        return res.sendStatus(401);//Não autorizado
    }

    try{
        const findSession = await sessionRepository.getSessionByToken(token);
        if(findSession.rowCount === 0){
            return res.sendStatus(401);
        }

        const sessions = findSession.rows;
        const [session] = sessions;
        const findUser = await userRepository.getUserById(session.userId);
        //Caso o usuário não bata com a sessao
        if(findUser.rowCount === 0){
            return res.sendStatus(401);
        }

        const [user] = findUser.rows;
        res.locals.user = user;
        next();
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}