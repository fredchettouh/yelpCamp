var express=require('express');
var app=express();
var router=express.Router({mergeParams:true});
var Campground=require('../models/campground.js');
var Comment=require('../models/comment.js');
var methodOverride= require('method-override');
app.use(methodOverride('_method'));
var middleware=require('../middleware/index.js');


// new comment route

router.get('/new',middleware.isLoggedIn,function(req,res){
    
    var id = req.params.id;
    Campground.findById((id),function(err,foundCampground){
        if (err){
            console.log(err);
        }else{
            res.render('comments/new.ejs',{campground:foundCampground});
        }
    });
});

// post new comment route

router.post('/',function(req, res){
    var id =req.params.id;
   Campground.findById(id, function(err,foundCampground){
       if (err){
           console.log(err);
       }else{
           Comment.create(req.body.comment,
             function(err,commentCreated){
                 if(err){
                     console.log(err);
                 }else{
                    commentCreated.author.id=req.user._id;
                    commentCreated.author.username=req.user.username;
                    commentCreated.save();
                    foundCampground.comments.push(commentCreated);
                    foundCampground.save();
                    req.flash('success','Comment created successfully');
                    res.redirect('/campgrounds/'+id);
                 }
             });
       }
   });

});

// Edit ROUTE

router.get('/:comment_id/edit',middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if (err){
            res.redirect('back');
        }else{
            res.render('comments/edit.ejs',{editComment:req.params, comment:foundComment});
        }
    });
}) ;


// Post ROUTE

router.put('/:comment_id',middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,function(err, updatedComment){
        if(err){
            res.redirect('back');
        }else
        res.redirect('/campgrounds/'+req.params.id);
    });

});


// delete Route

router.delete('/:comment_id',middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        }
    });
    req.flash('success','Comment deleted')
    res.redirect('/campgrounds/'+req.params.id);
});


module.exports=router;