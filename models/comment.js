var mongoose=require("mongoose");

//Schema Setup
var commentSchema=new mongoose.Schema({
    text:String,
    author:String,
    
});

//modelling
module.exports=mongoose.model("Comment",commentSchema);
