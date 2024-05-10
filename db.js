import mongoose from "mongoose";
require('dotenv/config');

mongoose.connect(process.env.CONNECT);

const db = mongoose.connection;

const handleopen = () => console.log('DataBase is ready....');
const handleclose = (error) => console.log(error);

db.once("open", handleopen);
db.on("error", handleclose);