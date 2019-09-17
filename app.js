require('./models/db');

const express = require('express');
var app = express();
const employeeController = require('./controllers/employeeController');
const exphbs = require('express-handlebars');
const path =require('path');
const bodyParser =require('body-parser');


//set view engine
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine','hbs');

//body parser
app.use(bodyParser.urlencoded({
    extended:true
}));

app.listen(3000,()=>{
    console.log('Server started at port : 3000')
});

//base routing
app.use('/employee',employeeController);