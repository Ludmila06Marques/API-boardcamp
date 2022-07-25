import { Router } from "express";
import { getUsers , getUser , createUser, updateUser } from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateUser.js";


const userRouter= Router()


userRouter.get("/customers", getUsers);
userRouter.get("/customers:id", getUser);
userRouter.post("/customers", validateUser, createUser);
userRouter.put("/customers", validateUser, updateUser);




export default userRouter;
