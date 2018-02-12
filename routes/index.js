var express=require("express");
var router=express.Router();

var passport=require("passport");

var User=require("../models/user");

router.get("/",function(req,res){
    res.redirect("/campgrounds");
});



//////////////////////////////////////////////
/////////////////AUTH ROUTES//////////////////
/////////////////////////////////////////////

router.get("/register",function(req,res){
    res.render("users/register");
})


router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("users/register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds")
            })
        }
    })
})



/////////////////////////////////////
//////LOGIN ROUTES////////////
////////////////////////////////////

//render logic form
router.get("/login",function(req,res){
    res.render("users/login");
})

//login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    }),function(req,res){
        });
        


/////////////////////////////////////
//////LOGOUT ROUTES////////////
////////////////////////////////////

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;