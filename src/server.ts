//TS requires ES6 style imports
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from './config/ppConfig';

const app = express();

app.use(express.static(__dirname + "/../client/build"));

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.set('view engine', 'ejs')

//Mongoose connection string needs to be typed as a string
mongoose.connect(process.env.MONGODB_URI as string );
const db = mongoose.connection; // Uses implicit typing
db.once('open', function(){
    console.log('Connected to MOngoDb server');
});
db.on('error', function(err) {
    console.log('An error occurred', err);
});

// Configure session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session())


import authRouter from './routes/auth';
app.use('/auth', authRouter)
import apiRouter from './routes/api';
app.use('/api', apiRouter)

app.get('*', (req, res) => {
    res.sendFile(__dirname + "/../client/build/index.html");
});

app.listen(process.env.PORT, () => {
    console.log(`Express listening on port ${process.env.PORT}`);
});