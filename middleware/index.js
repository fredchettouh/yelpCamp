var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');

var middlewareObj={};


middlewareObj.checkCampgroundOwnership=function (req, res,next){
    if(req.isAuthenticated()){
        var id=req.params.id;
        Campground.findById(id, function(err, foundCampground){
            if (err){
            req.flash('error','Campground not found');
            res.redirect('back');
            console.log(err);
            }else{
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                }else
                req.flash('error','You do not have permission do to this');
                res.redirect('back');
            }
        });
    }else{
        req.flash('error','You need to be logged in to do this');
        res.redirect('back');
    }
};


middlewareObj.checkCommentOwnership= function (req,res,next){
     if (req.isAuthenticated()){
         Comment.findById(req.params.comment_id,function(err,foundComment){
             if(err){
                 req.flash('error','Comment not found');
                 res.redirect('back');
             }else{
                 if(foundComment.author.id.equals(req.user.id)){
                     next();
                 }else{
                     req.flash('error','You do not have permission do to this');
                     res.redirect('back');
                 }
                 
             }
        });
     }else{
        req.flash('error','You need to be logged in to do this');
        res.redirect('back');
     }
} ;

middlewareObj.isLoggedIn=function (req, res,next){
    if (req.isAuthenticated()){
        return next();
    }
    // The flash collects the message and is only displayed on the next page
    // Flash syntax is a key value structure
    req.flash('error','You need to be logged in to do this');
    res.redirect('/login');
};
 

 
 module.exports = middlewareObj;

 
