import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest: 'uploads/videos/'});
const multerAvatar = multer({dest:'uploads/Avatars/'});

export const localmiddlewares = (req, res, next) => {
    res.locals.siteName = "folkTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    }
    else{
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    }
    else{
        res.redirect(routes.home);
    }
};

export const UploadVideo = multerVideo.single('videoFile');
export const UploadAvatar = multerAvatar.single('Avatar');