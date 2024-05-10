import  express  from "express";
import routes from "../routes";
import { deleteVideo, geteditVideo, posteditVideo, getUpload, postUpload, videoDetail } from "../controllers/videoController";
import { UploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

//upload video
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, UploadVideo, postUpload);

//edit video
videoRouter.get(routes.editVideo(), onlyPrivate, geteditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, posteditVideo);


//video details
videoRouter.get(routes.videoDetail(), videoDetail);

//delete video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);


export default videoRouter;