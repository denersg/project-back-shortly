import { Router } from "express"
import { tokenValidator } from "../middlewares/authTokenValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { shorten, getURLById, deleteURL, openShortURLAndRedirect } from "../controllers/urlController.js";
import urlSchema from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", schemaValidator(urlSchema), tokenValidator, shorten);
urlRouter.get("/urls/:id", getURLById);
urlRouter.get("/urls/open/:shortUrl", openShortURLAndRedirect);
urlRouter.delete("/urls/:id", tokenValidator, deleteURL);

export default urlRouter;