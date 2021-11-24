// The express framework is built on top of the node. js framework and helps in fast-tracking development of server-based applications.
const express=require('express');
// we don't need to install path bcoz it is inbuilt module in npm
const path=require('path');
// the port no. on which we see in the browser lile localhost:8002
const port=8002;
// The bodyParser object exposes various factories to create middlewares. as variable
var bodyParser = require('body-parser');
// require mongoose
const db= require('./config/mongoose');
// accesing the task through router
const Task=require('./models/task');

const app= express();
// set up view engine
app.set('view engine' ,'ejs');
// we are using __dirname so that other person don't need to change the path again and again
app.set('views',path.join(__dirname,'views'));
// middleware who encode the url
app.use(express.urlencoded());
// accessing the static files
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));
// make a array of objects
var todoList=[
    {
       description:"simran",
        category:"1111111111",
        date: "04-01-2001"
    },
    {
        description:"simran",
        category:"1111111111",
        date: "04-01-2001"
    },
    {
        description:"simran",
        category:"1111111111",
        date: "04-01-2001"
    }
]

// get the task through routing with get method (make a request and get response) and use controller for action
app.get('/', function(req,res){
    Task.find({}, function(err,tasks){
        if(err){
            console.log("error in fetching tasks from db");
            return;
        }
    
    return res.render('home', { 
        title: "My todo-list app",
        todo_List: tasks
     });
    });
    });

// create a new task 
app.post('/create-task', function(req,res){
    //  todoList.push(req.body);
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    },function(err, newContact){
        if(err){
            console.log("error in creating a task");
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    });
});
// for deleting a task
app.post('/delete-task', function(req, res){
    // console.log(req.query);
    // // get the id from query in the url
    // let id = req.query.id
    // // find the task in the database using id and delete it
    // Task.findOneAndDelete(id, function(err){
    //     if(err){
    //         console.log('error in deleting the object from database');
    //         return;
    //     }
    //     return res.redirect('back');
    // });   
// GET THE ID IN TASK AND DELETE SELECTED USING  findByIdAndDelete 
    Object.keys(req.body).forEach(function(key){
        Task.findByIdAndDelete(key,function(err){
            if(err){
                console.log('Error in deleting an list from database',err);
                return;
            }
            console.log('One list is deleted');
            
        });
    });
    return res.redirect('back');

});

// if gets  the error in running the server on port
app.listen(port,function(err){
    if(err){
        // using interpolation
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is ruuning on: ${port}`);
});