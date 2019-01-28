var mongoose    = require('mongoose');
var Campground  = require('./models/campground.js');
var Comment     = require('./models/comment.js')

var data=[
    {name:'Moab',
    image:'https://images.unsplash.com/photo-1456929186139-2b8e39320da9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2c95e9be8dae3679dbb1fdf2f173b8db&auto=format&fit=crop&w=1489&q=80',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.,'
    },
    {name:'Byron Bay',
    image:'https://images.unsplash.com/photo-1534323638421-d602d770aab8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da4f9e35aee3db9226f3c120a56c8133&auto=format&fit=crop&w=1268&q=80',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.,'
    },
    {name:'Foz de Iguacu',
    image:'https://images.unsplash.com/photo-1482951486181-13a752dbbd52?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=61d13ecbc480318f901f7140623a4ec9&auto=format&fit=crop&w=1350&q=80',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.,'
    }
    ];

Campground.remove({});

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('campgrounds removed');
        }
    data.forEach(function(element){
       Campground.create(element,function(err,campground){
         if(err){
             console.log(err);
         }else{
             console.log('Campground created');
             Comment.create({
                 text:'No Wifi here',
                 author: 'homer'
             },function(err,commentCreated){
                 if(err){
                     console.log(err);
                 }else{
                     campground.comments.push(commentCreated);
                     campground.save();
                     console.log('created new comment');
                 }
             });
         }
       });
    });
    });

}




module.exports=seedDB;