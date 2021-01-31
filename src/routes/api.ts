import { Router } from 'express';
import { json } from 'body-parser';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


const router = Router();
const { OK } = StatusCodes;

router.use(json());
  
router.get("/version", (req: Request, res: Response) => {
    res.status(OK).json({
        version: process.env.npm_package_version
    });
});

export default router;