var express=require("express");
var router=express.Router();

var Campground=require("../models/campground");
var Comment=require("../models/comment");


router.get("/",function(req,res){
    res.redirect("/campgrounds");
});



//////////////////////
///COMMENT ROUTES////
/////////////////////

router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log("error in finding the id");
       }else{
            res.render("comments/new",{campground:foundCampground});
       }
   })
   
})


router.post("/campgrounds/:id/comments",isLoggedIn, function(req,res){
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log("error in findind the id");
           res.redirect("/campgrounds");
              }else{
                 // console.log(req.body.comment);
                Comment.create(req.body.comment,function(err,comment){
              if(err){
                  console.log(err)
              }else{
                  foundCampground.comments.push(comment);
                  foundCampground.save();
                  res.redirect("/campgrounds/"+foundCampground._id);
                   
              }
          })
            
       }
   })
   
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;