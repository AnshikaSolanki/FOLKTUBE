import  mongoose  from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    instagramId: Number,
    githubId: Number,
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comments"
    }],
    videos : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Videos"
    }],
});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

const model = mongoose.model("users", UserSchema);
export default model;