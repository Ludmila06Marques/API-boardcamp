import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
//import { validateUser } from "../middlewares/validateUser.js";


const userRouter= Router()


userRouter.get("/customers", getUsers);


export default userRouter;
