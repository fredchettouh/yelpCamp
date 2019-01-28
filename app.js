// variables
var express     =require('express');
var app         =express();
var bodyParser  =require('body-parser');
var mongoose    =require('mongoose');
var methodOverride= require('method-override');
var Campground  =require('./models/campground.js');
var Comment     =require('./models/comment.js');
var seedDB      =require('./seed.js');
var LocalStrategy=require('passport-local');
var passport    =require('passport');
var User        =require('./models/user.js');
var flash       =require('connect-flash');
var port 			=		3000;

// var passportLocalMongoose=require('passport-local-mongoose')

var commentRoutes=require('./routes/comment.js');
var campgroundRoutes=require('./routes/campgrounds.js');
var indexRoutes=require('./routes/index.js');



// remove all campgrounds

// seedDB(); //seeding the database


mongoose.connect("mongodb://localhost:27017/yelpCamp",{ useNewUrlParser: true },function(){
    console.log('database is connected');
});

 
// app use adds the functionality to express
// therefore it works as part of req or res and does
// not have to be imported every time
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());


// Passport Configuration
app.use(require('express-session')({
    secret:'This is to encode',
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this is passport local configuration
// it allows me to set a variable e.g. 
// user of message so that it is available
// on all routes i.e. the rendered documents (ejs)
app.use(function(req,res,next){
    res.locals.user=req.user;
    res.locals.error=req.flash('error')
    res.locals.success=req.flash('success')

    next();
});

app.use(indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);



app.listen(port, function(){
	console.log('sensor server is running')
	});