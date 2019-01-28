var express=require('express');
var router=express.Router();

var User=require('../models/user.js');
var passport=require('passport');



// middleware

function isLoggedIn (req, res,next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
 



// home page route

router.get('/',function(req,res){
    res.render('home.ejs');
});





// AUTH route


router.get('/register', function(req,res){
    res.render('register.ejs');
});

router.post('/register',function(req,res){
     var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,
    function(err, user){
        if (err){
            req.flash('error',err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success','Welcome to yelpCamp');
            res.redirect('/campgrounds');
    });
    }  
  );
});


// login route

router.get('/login',function(req,res){
    res.render('login.ejs');
});


// handling login logic
router.post("/login", passport.authenticate("local", 
    
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){

});


// logout route

router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','You are logged out');
    res.redirect('/');
});


module.exports=router;