var express=require("express");
var router=express.Router();

var Campground=require("../models/campground");


router.get("/",function(req,res){
    res.redirect("/campgrounds");
});



//////////////////////////////////////////////
/////////////////CAMPGROUNDS ROUTES//////////////////
/////////////////////////////////////////////


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


router.get("/campgrounds",function(req,res){
    //get all campgrounds from database
    //res.render("campgrounds",{campgrounds:campgrounds});
    Campground.find({},function(err,allCampgrounds){
       if(err){
            console.log("Something went wrong");
            console.log(err);
        }
        else{
            console.log("Newly Created Campground")
            console.log(req.user)
            res.render("campgrounds",{campgrounds:allCampgrounds, currentUser:req.user});
        }
    })       
    })
  

router.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});
  


router.post("/campgrounds",function(req,res){
    var newImageName=req.body.name;
    var newImageURL=req.body.image;
    var newImageDesc=req.body.description;
    console.log("the name you have entered is:"+newImageName);
    console.log("the image you have entered is:"+newImageURL);
    console.log("the image you have entered is:"+newImageDesc);
    
    
    var newCampGround={name:newImageName, image:newImageURL,description:newImageDesc};
    //create a new campground and save to db
    Campground.create(newCampGround, function(err,newlyCreated){
        if(err){
            console.log("Something went wrong in posts method");
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    
        
    })

});


//Show more information about one object
router.get("/campgrounds/:id",function(req,res){
    var id=req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("Error found at show request")
        }else{
             res.render("campgrounds/show",{campground:foundCampground});
        }
    })
   
})

module.exports=router;