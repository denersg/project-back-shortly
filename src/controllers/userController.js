import urlRepository from "../repositories/urlRepository.js";
import userRepository from "../repositories/userRepository.js";

export async function getUserById(req, res){
    const { user } = res.locals;
    
    try{
        const result = await urlRepository.getNumberVisitByUser(user.id);
        const [visitCount] = result.rows;
        
        const findUser = await userRepository.getUserById(user.id);
        if(findUser.rowCount === 0){
            res.sendStatus(404);
        }

        //Busca as URLs do usuário
        const mergedURLs = await userRepository.getFormattedUserURLs(user.id);
        const userURLs = mergedURLs.rows;
        
        const body = {
            id: user.id,
            name: user.name,
            visitCount: visitCount.sum || 0,
            shortenedUrls: userURLs
        };

        res.status(200).send(body);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRanking(req, res){
    try{
        const result = await userRepository.getURLsRankingByUser();
        res.status(200).send(result.rows);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}