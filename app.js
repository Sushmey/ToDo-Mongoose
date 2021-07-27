var express = require('express');
const path = require('path');
var app = express();
var bodyParser = require('body-parser'); //middleware
var mongoose = require('mongoose');
app.use(express.static(__dirname + '/views'));

mongoose.connect('mongodb://localhost/todo'); //Connecting to the local db

app.set('view engine','ejs'); //setting view engine as ejs 
app.use(bodyParser.urlencoded({extended:true})); //using encodedUrl


var todoSchema = new mongoose.Schema({  //creating schema for the db
	name: String
});

var Todo = mongoose.model('Todo',todoSchema); //creating object model

app.get('/',function(req,res)
{
	Todo.find({},function(err,todoList){
		if(err) console.log(err);
		else
		{
			res.render('index.ejs',{todoList:todoList});  //sending todoList as a parameter
		}
	})
	
});
 
app.get('*',function(req,res){   //Invalidating all the other links
	res.send('<h1>Invalid link</h1>'); 
})

app.post('/post',function(req,res){   //Endpoint to post tasks
	console.log("item added!");
	var item = new Todo({name:req.body.item});
	Todo.create(item,function(err,Todo){
		if(err)console.log(err);
		else
		{
			console.log('Inserted Item: '+item);
		}
	})
	res.redirect('/');
})

app.post('/delete',function(req,res){ //ToDo: Endpoint to delete tasks after done
	res.redirect('/');
})

app.listen(3000, function(){  //Connecting the express server to an open port
	console.log('Listening on port 3000');
});

