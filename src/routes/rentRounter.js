import { Router } from "express";
import { cleanRent, finishRent, getRents, newRent } from "../controllers/rentController";



const rentRouter= Router()


rentRouter.get("/rentals", getRents);
rentRouter.get("/rentals", newRent);
rentRouter.get("/rentals", finishRent);
rentRouter.get("/rentals", cleanRent);


export default rentRouter;
