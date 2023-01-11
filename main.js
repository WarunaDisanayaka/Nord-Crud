//Import 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectFlash = require('connect-flash');
const connectMongo = require('connect-mongo');


const app = express();
const PORT = process.env.PORT || 4000;


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
});



//Database connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open', ()=> console.log("Connected to database"));


//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
    secret: 'my secret key',
    saveUninitialized : true,
    resave : false
    })
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));

//set template ejs

app.set('view engine', 'ejs');
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/vendor',express.static(path.resolve(__dirname,"assets/vendor")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
//route prefix
app.use("",require("./routes/routes"));
app.use("",require("./routes/authRoutes"));

//Middleware

app.use("",express.static('public'));
app.use("",express.json());

//Cookies

app.get('/set-cookies',(req,res)=>{

    //res.setHeader('Set-Cookie','newUser=true');

    res.cookie('newUser',false);

    res.cookie('isEmployee',true,{maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send('You got the cookies!');

});

app.get('/read-cookies',(req,res)=>{

    const cookies = req.cookies;
    console.log(cookies);

    res.json(cookies);

});

