import  express  from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, logout, getLogin, postLogin, githubLogin, postGithubLogin, getMe, facebookLogin, postfacebookLogin } from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";


const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);


globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate("github", {failureRedirect: "/login"}), postGithubLogin);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.fbCallback, passport.authenticate("facebook", {failureRedirect: "/login"}), postfacebookLogin);

globalRouter.get(routes.me, getMe);

export default globalRouter;