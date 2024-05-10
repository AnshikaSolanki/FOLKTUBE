import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import  mongoose  from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localmiddlewares }  from "./middlewares";
import  userRouter  from "./routers/userRouter";
import  videoRouter from "./routers/videoRouter";
import  globalRouter  from "./routers/globalRouter";
import  apiRouter  from "./routers/apiRouter";
import routes from "./routes";
import "./db.js";


import "./passport";

const app = express();


require('dotenv/config');



app.use(helmet({
    contentSecurityPolicy: false
}));
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));



app.use(session({
    secret: process.env.COOKIESECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: process.env.CONNECT,
        db : mongoose.connection.db
    })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(localmiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);



export default app;

