import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import './node_modules/dotenv/config.js';

const app = express();

//Middlewares
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

//MongoDB Atlas Cloud setup
const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log('listening on port ' + PORT)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
