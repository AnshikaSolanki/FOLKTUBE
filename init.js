require('dotenv/config');
import app from "./app";
import './db.js';

import './models/Videos.js';
import './models/Comments.js';
import './models/users.js';

const Port = process.env.PORT;

const handlelistening = () => console.log(`=> Listening on : http://localhost:${Port}`);

app.listen(Port, handlelistening);

