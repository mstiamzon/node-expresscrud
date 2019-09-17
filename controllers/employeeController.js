const express =require('express');
var router= express.Router();
var mongoose =require('mongoose');
var Employee = mongoose.model('Employee');


router.get('/',(req,res)=>{
   // res.json('hi')
   res.render("employee/addOrEdit",{
       viewTitle:"Insert Employee"
    
   });
})

router.post('/',(req,res)=>{
    //console.log('HI')
    //console.log(req.body);

    if (req.body._id == '') {
        insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
});

function updateRecord(req,res) {
    Employee.findOneAndUpdate({_id: req.body._id},req.body,{new:true},(err,doc)=>{
            if (!err) {
                res.redirect('employee/list');
            }
            else{
                if (err.name == 'ValidationError') {
                    handleValidationError(err,req.body);
                    res.render("employee/addOrEdit",{
                        viewTitle:"Update Employee",
                        employee: req.body
                    });
                }
                else{

                    console.log('Error during record Update' + err);
                }
            }
    })
}

function insertRecord(req,res) {
    var employee = new Employee();
    employee.fullName =req.body.fullName;
    employee.email =req.body.email;
    employee.mobile =req.body.city;
    employee.city =req.body.city;

    employee.save((err,doc) =>{
        if (!err) {
            res.redirect('employee/list');
   
        } else {
            if (err.name =='ValidationError') {
                handleValidationError(err,req.body);
                 res.render("employee/addOrEdit",{
                      viewTitle:"Insert Employee",
                      employee: req.body
                  });
            }
            else{

                console.log('Error during record insert' + err);
            }
        }
    });
}



//Add List
router.get('/list',(req,res)=>{
    // res.json('list')
    // res.render("employee/addOrEdit",{
    //     viewTitle:"Insert Employee"
     
    // });

    Employee.find((err,docs) =>{
        if (!err) {
         res.render("employee/list",{
            list:docs
          });
        }
        else{
            console.log('Error in retrieving list' + err);
        }
    })
 })

 function handleValidationError(err,body) {
    for(field in err.errors){
      switch(err.errors[field].path)  
     {
     case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] =err.errors[field].message;
        break;
      default:
        break;
     } 
    }
 }


 router.get('/:id',(req,res)=>{
     Employee.findById(req.params.id,(err,doc)=>{
         if (!err) {
             res.render("employee/addOrEdit",{
                 viewTitle:"Update Employee",
                 employee:doc
             });
         }
     })
 });

 
 router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndDelete(req.params.id,(err,doc) =>{
        if (!err) {
            res.redirect('/employee/list/');
        }
        else{
            console.log('Error employee delete' + err);
        }
    })

 })
module.exports =router;