import express from 'express'
import { loginUser, registerUsers, adminLogin } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUsers)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;