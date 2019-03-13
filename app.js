var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const dishRouter = require("./routes/dishRouter");
const leadersRouter = require("./routes/leaders");
const promotionRouter = require("./routes/promotionRouter");

const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connect correctly to the server");
  },
  (err) => {
    console.log(err);
  }
);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('15256-20305-40489-49478'));

function auth(req, res, next) {
  console.log(req.signedCookies);


  /*Declaring condional statment to see if the user doesn't send the authentication header
   we will send the login process */

   if(!req.signedCookies.user){

    const authHeader = req.headers.authorization;

    /*Declare conditional statement to indentify if the user doesn't send authentication header
     so we will generate an error and we 
      will challange him to send the authenication header*/

    if (!authHeader) {
      const err = new Error("You are not authenticated");
  
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(err);
    }
    //Declare the authnication method with using that will split the Authentication header and converted to base64
    //Second part change the base64 to string and solit it by ':'
    const auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
  
    //Declare the two vars username and password and assing to each one a value of the auth array index 0 and 1
    const username = auth[0];
    const password = auth[1];
  
    //Declare conditional statment for the user authenication state with given userName and passWord default values
    //Second step  if the user authentication math thoes values will move it to the next step with next() method
    //If not we will generate error and challange the user to give the correct authentication values
    if (username === "admin" && password === "password") {
      res.cookie('user','admin',{signed: true})
      next();
    } else {
      const err = new Error("You are not authenticated");
  
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
       return next(err);
    }
   }
   /*if the cookies exist and the singIn header exist and they are eqaul
    to the value then allow the request to pass throw with next() */
   else {
     if(req.signedCookies.user === 'admin'){
       next()
     }
     else{
      const err = new Error("You are not authenticated");
  
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
       return next(err);
     }
   }
}

app.use(auth);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);
app.use("/promotion", promotionRouter);
app.use("/leaders", leadersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
