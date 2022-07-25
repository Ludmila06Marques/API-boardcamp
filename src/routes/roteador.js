
import { Router } from "express"
import categoryRouter from "./categoryRouter.js"
import gamesRouter from "./gamesRouter.js"
import userRouter from "./userRouter.js"

const router= Router()


router.use(categoryRouter)
router.use(gamesRouter)
router.use(userRouter)


export default router