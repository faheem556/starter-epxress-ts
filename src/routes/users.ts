import { Request, Response, Router } from 'express';
import userModel from '../models/user.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await userModel.find();
  res.render('users', {
    title: "System Users",
    users: users
  });
});

export default router;