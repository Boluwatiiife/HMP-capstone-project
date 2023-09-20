import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from './routes/user.routes';
import * as swaggerUi from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

const swaggerSpec = require('./spec/swagger');
dotenv.config();
// const mongoDB_connection_string: string = process.env.mongoDB

const app = express();

//middleware.
app.use(bodyParser.json());
app.use(express.json());

app.use( userRouter );  
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('*', (req: express.Request, res: express.Response) => {
    return res.status(404).send({ message: 'page not found!'});
})
app.post('*', (req: express.Request, res: express.Response) => {
    return res.status(404).send({ message: 'page not found!, please enter the correct parameters'});
})


app.listen(3333, async () => {
    console.log('server is running!');
    await mongoose.connect(`${process.env.MONGO_DB}`);
    console.log('Connected to MongoDB');
    console.log(`your api doc is on http://localhost:3333/docs`)
});