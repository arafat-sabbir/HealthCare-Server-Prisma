import Router, { NextFunction, Request, Response } from 'express';
import UserController from './user.controller';
import { upload } from '../../shared/multer';

const router = Router();

router.post("/", upload.single('profilePhoto'), 
(req:Request,res:Response,next:NextFunction)=>{
    const parsedData = JSON.parse(req?.body?.data);
    const body = {
        ...parsedData,
        profilePhoto: req?.file?.path
    };
    req.body = body;
    next()
},UserController.createUser);

router.get("/", UserController.getUsers);

const userRoutes = router;
export default userRoutes;