require('dotenv').config()
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path")
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("express-flash")
const MongoDbstore = require("connect-mongo")(session) //Connect mongo is used to store sessions in the database
const passport = require("passport")

//Mongodb Connection
mongoose.connect("mongodb://localhost:27017/nike", { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database Connected");
}).catch(err => {
    console.log("Connection failed");
})


//Session Store (used to store sessions in the database)
let mongoStore = new MongoDbstore({
    mongooseConnection: connection, //Where you wanna store it (DB)
    collection: "sessions" // Collection name
})

//Session Config (used to create sessions)
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore, // To make sure it stores in a database and not memory
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}))

//Passport Config
const passportInit = require("./app/config/passport")
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// Used to display messages by having key and message 
app.use(flash())

//Assets
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(expressLayout)

//Global Middleware 
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()

})

//Set Template Engine
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)
app.use((req, res) => {
    res.status(404).render("errors/404.ejs")
})

//Port
app.listen(3000, function () {
    console.log("Server Started");
})