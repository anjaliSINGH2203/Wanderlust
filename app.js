if(process.env.NODE_ENV != "production"){  //development phase m sirf require ho otherwise log hmare secret dekh skte hagr logo ko hmara project accessible hua to
  require('dotenv').config();    // to access the env file in our project
}


console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate"); // for creating templates which remains same on all pages like header, navbar, footer etc
const wrapAsync= require("./utils/wrapAsync.js"); //custom class createda by me for error handling
const ExpressError= require("./utils/ExpressError.js");
const {listingSchema, reviewSchema }= require("./schema.js");
const Review = require("./models/review.js");
const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter= require("./routes/review.js");
const userRouter= require("./routes/user.js");




//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) =>{
  console.log("ERROR in mongo SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret:  process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 1000,
    maxAge: 7* 24 * 60 *60 * 1000,
    httpOnly: true,
  },
};


app.get("/", (req, res) => {
  res.render("home");
});


// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });



app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());    //to serialize users into the session
passport.deserializeUser(User.deserializeUser());  //to deserialize users from the session




// Make currUser available in all templates
app.use((req, res, next) => {
    res.locals.currUser = req.user;   // agar user logged in hai
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});



/*
app.use((req,res, next) => {
  res.locals.success = req.flash("success"); // kuch bhi update create delete etc successfully ho jat ah ato
  res.locals.error = req.flash("error");   // agr koi listing ka link daal rhe h aur vo exist hi nhi krti to error msg
  res.locals.currUser= req.user;
  next();
});

/*app.get("/demouser", async(req, res) => {
  let fakeUser= new User({
    email: "student@gmail.com",
    username: "delta"
  });
  let registeredUser= await User.register(fakeUser, "helloworld");
  res.send(registeredUser);
})*/



//validate listing

const validateListing= (req, res, next)=>{
  let {error} = listingSchema.validate(req.body);
      if(error){
        let errMsg= error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
      } else{
        next();
      }
}



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.use((req, res, next) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url}`);
});


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) =>{
  let { statusCode=500, message= "Something Went Wrong!"}= err;
  res.status(statusCode).render("error.ejs", {message});
  // res.status(statusCode).send(message);
  });

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
