import  express  from "express";
import routes from "../routes";
import { postchangePassword, getEditProfile, userDetail, postEditProfile, getchangePassword } from "../controllers/userController";
import { UploadAvatar, onlyPrivate } from "../middlewares";

const userRouter = express.Router();


userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, UploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getchangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postchangePassword);

userRouter.get(routes.userDetail(), userDetail);


export default userRouter;


