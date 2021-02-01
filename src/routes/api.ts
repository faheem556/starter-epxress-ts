import { NextFunction, Router } from 'express';
import { json } from 'body-parser';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import userModel from '../models/user.model';
import { inspect } from 'util';
import logger from '../shared/logger'

const router = Router();
const { OK, CREATED, BAD_REQUEST } = StatusCodes;

router.use(json());

router.get("/version", (req: Request, res: Response) => {
    res.status(OK).json({
        version: process.env.npm_package_version
    });
});

  
router.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await userModel.find();
        res.status(OK).json(users);

    } catch(err) {
        return err;
    }
});

router.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(inspect(req.body));
        const user = await userModel.create(req.body);
        res.status(CREATED).json(user);

    } catch(err) {
        logger.err("error" + inspect(err));
        next(err);
    }
});

export default router;