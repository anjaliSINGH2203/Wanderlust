const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js"); // <-- import ExpressError
const { listingSchema, reviewSchema} = require("./schema.js");   // <-- import validation schema

module.exports.isLoggedIn = (req, res, next) =>{
  
    if(!req.isAuthenticated()){
      req.session.redirectUrl= req.originalUrl;
    req.flash("error", "Log in to create new Listing!");
     return res.redirect("/login"); 
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) =>{
  
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
  
};

module.exports.isOwner = async(req, res, next) =>{
   let { id } = req.params;
    let listing= await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You don't have permission!");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

// middleware for validation (you already wrote this in app.js, move here or import)
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview= (req, res, next)=>{
  let {error} = reviewSchema.validate(req.body);
      if(error){
        let errMsg= error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, result.errMsg);
      } else{
        next();
      }
};

module.exports.isReviewAuthor = async(req, res, next) =>{
   let { id, reviewId } = req.params;
    let listing= await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error", "You don't have permission to make changes to the review!");
      return res.redirect(`/listings/${id}`);
    }
    next();
};