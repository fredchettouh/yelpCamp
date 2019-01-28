var express=require('express');
var router=express.Router({mergeParams:true});
var middleware=require('../middleware/index.js');


var Campground=require('../models/campground.js');


// INDEX ROUTE: SHOW ALL CAMPGROUNDS
router.get('/',function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if (err){
            console.log(err);
        } else{
            res.render('campgrounds/index.ejs',{campgrounds:allCampgrounds
            });
        }
    });

});




// CREATE ROUTE: ADD NEW CAMPGROUND TO DB

router.post('/', middleware.isLoggedIn , function(req,res){
    var name=req.body['name'];
    var image=req.body['image'];
    var description=req.body['description'];
    var author={id:req.user._id,username:req.user.username};
    var newCampground={ name:name,image:image,description:description,author:author};
    Campground.create(newCampground,function(err, campground){
        if (err){
            console.log(err);
        }else{
            console.log(campground);
        }
    });
    // campgrounds.push({name:name,image:image});
    res.redirect('/campgrounds');
});

// NEW ROUTE:SHOW FORM FOR NEW CAMPGROUND

router.get('/new',middleware.isLoggedIn, function(req,res){
    res.render('campgrounds/new.ejs');
});


// SHOW ROUTE:SHOW DETAILED VIEW OF CAMPGROUND

router.get('/:id',function(req,res){
    var id = req['params']['id'];
    Campground.findById(id).populate('comments').exec(function(err,foundCampground){
        if (err){
            console.log(err);
        }else {
        }
    res.render('campgrounds/show.ejs',{campground:foundCampground});
    });
});


// EDIT Route 

router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req,res){
        var id=req.params.id;
        Campground.findById(id, function(err, foundCampground){
            res.render('campgrounds/edit.ejs',{campground:foundCampground});
        });
});

// Update Route

router.put('/:id',middleware.checkCampgroundOwnership,function(req,res){
    var data={
        name:req.body.name,
        image:req.body.image,
        description:req.body.description};
    Campground.findOneAndUpdate({_id:req.params.id},data,function(err,updateCampground){
        if (err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});   


// DELETE ROUTE

router.delete('/:id',middleware.checkCampgroundOwnership, function(req,res){
    Campground.findOneAndDelete({_id:req.params.id},function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        }
    });
    res.redirect('/');
});
            
module.exports=router;
