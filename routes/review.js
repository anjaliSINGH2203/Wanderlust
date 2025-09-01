const express= require("express");
const router = express.Router({mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");     // <-- import wrapAsync
const ExpressError = require("../utils/ExpressError.js"); // <-- import ExpressError
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController= require("../controllers/review.js");



//Reviews
//Post rOute   // hmne index routev ya cteate route reviews k liye isliye nhi create kiya sidhe post route hi kyu create kiya kyuki revies hmesha showlisting vale page k sath hi ayenge to jarurt nhi h

router.post("/",isLoggedIn, validateReview,
  wrapAsync( reviewController.createReview));

//Delete REVIEW route

router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync( reviewController.destroyReview)
);

module.exports = router;