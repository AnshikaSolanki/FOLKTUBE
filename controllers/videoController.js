import routes from '../routes';
import Videos from '../models/Videos';
import Comments from "../models/Comments";

export const home = async(req, res) => {
    try {
        const videos = await Videos.find({}).sort({_id:-1});
        res.render("home", {pageTitle: "Home", videos});
    } catch (error){
        console.log(error);
        res.render("home",{pageTitle: "Home", videos: []})
    }
}

export const search = async(req, res) => {
    const{
        query : {term : searchingby}
    }=req;
    let videos = [];
    try{
        videos = await Videos.find({title: {$regex : searchingby, $options: "i"}});
    }catch(error){
        console.log(error);
    }
    res.render("Search", {pageTitle: "Search", searchingby, videos});
};


export const geteditVideo = async(req, res) => {
    const {
        params: {id}
    }=req;
    try{
        const videos = await Videos.findById(id);
        if(videos.creator !== req.user.id){
            throw Error();
        }
        else{
            res.render("editVideo", {pageTitle: `Edit ${videos.title}`, videos});
        }    
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
};

export const posteditVideo = async(req, res) => {
    const {
        params: {id},
        body: {title, description}
    }=req;
    try{
        await Videos.findByIdAndUpdate({_id:id},{title, description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
};

export const deleteVideo = async(req, res) => {
    const {
        params: {id}
    }=req;
    try{
        if(Videos.creator !== req.user.id){
            throw Error();
        }
        else{
            await Videos.findOneAndDelete({_id:id});
        }
        
    }catch(error){}
    res.redirect(routes.home);
    
}


export const getUpload = (req, res) => {
    res.render("upload", {pageTitle: "Upload"})
};

export const postUpload = async (req, res) => {
    const{
        body : {title, description},
        file : {path}
    } = req;
    const newVideo = await Videos.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    })
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const {
        params : {id}
    } = req;
    try{
        const videos = await Videos.findById(id).populate("creator").populate("comments");
        res.render("videoDetail", {pageTitle: `${videos.title}`, videos});
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
};


export const postRegisterView = async(req, res) => {
    const {
        params: {id}
    } = req;
    try{
        const video = await Videos.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }
};


export const postAddComment = async(req,res) => {
    const {
        params: {id},
        body: {comment},
        user
    }= req;
    try{
        const video = await Videos.findById(id);
        const newComment = await Comments.create({
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        video.save();
    }catch(error){
        res.status(400);
    }finally{
        res.end();
    }
}

