import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import users from './models/users.js';
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController.js";
import routes from "./routes.js";

passport.use(users.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://loaclhost:4000${routes.githubCallback}`
},githubLoginCallback
)
);

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `https://busy-maps-tan.loca.lt${routes.fbCallback}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile', 'email']
},facebookLoginCallback
));

passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());