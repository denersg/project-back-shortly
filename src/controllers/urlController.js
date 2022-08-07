import { nanoid } from "nanoid";
import urlRepository from "../repositories/urlRepository.js";

export async function shorten(req, res){
    const { id } = res.locals.user;
    const { url } = req.body;

    const numCharacters = 8;
    const shortUrl = nanoid(numCharacters);

    try{
        await urlRepository.addShortURL(url, shortUrl, id);
        res.status(201).send({ shortUrl });
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getURLById(req, res){
    const { id } = req.params;

    try{
        const result = await urlRepository.findURLById(id);
        if(result.rowCount === 0){
            return res.sendStatus(404);
        }

        const [urlData] = result.rows;
        delete urlData.visitCount;
        delete urlData.userId;
        delete urlData.createAt;
        const url = {
            id: urlData.id,
            shortUrl: urlData.shortUrl,
            url: urlData.url
        };

        res.send(url);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function openShortURLAndRedirect(req, res){
    const { shortUrl } = req.params;
    
    try{
        //Validando se a URL encurtada existe
        const result = await urlRepository.findByShortenedURL(shortUrl);
        if(result.rowCount === 0){
            return res.sendStatus(404);
        }

        const [url] = result.rows;
        await urlRepository.countNumberOfVisitsToLink(url.id);
        res.redirect(url.url);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteURL(req, res){
    const { id } = req.params;
    const { user } = res.locals;

    try{
        const findUrl = await urlRepository.findURLById(id);
        if(findUrl.rowCount === 0){
            return res.sendStatus(404);
        }
        //Se a URL não pertencer ao usuário
        const [url] = findUrl.rows;
        if(url.userId !== user.id){
            return res.sendStatus(401);
        }

        await urlRepository.deleteURL(id);

        res.sendStatus(204);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}