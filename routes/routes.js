const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const users = require('../models/users');
const fs = require('fs');
const Project = require('../models/Project');
const ProjectDivision = require('../models/ProjectDivision');
const Task = require('../models/Task');
const bodyParser = require('body-parser');
const {body,validationResult, check}=require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const connectFlash = require('connect-flash');

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});

var upload = multer({
    storage: storage,
}).single("image");

router.get('/projectlist',(req,res)=>{
    Project.find().exec((err,project)=>{
        if (err) {
            res.json({message:err.message});
        }else{
            res.render("projectlist",{
                title: "Edit User",
                project : project,
            });
            console.log(project)
        }
    });
});

router.get("/taskslist",(req,res)=>{
    Task.find().exec((err,task)=>{
        if (err) {
            res.json({message: err.message});
        }else{
            res.render("taskslist",{
                title: "Edit User",
                task : task,
            });
        }
    })
})

router.get('/',(req,res)=>{
    res.render("index",{
        title: "Home page",
        //users: users,
    })
});

router.get('/addproject',(req,res)=>{
    res.render("addproject",{
        title: "Home page",
        //users: users,
    })
});

router.get('/projectlist',(req,res)=>{
    res.render("projectlist",{
        title: "Home page",
        //users: users,
    })
});

/* 
    ===================
    Rendering all pages
    ===================
*/




router.get('/tasks',(req,res)=>{
    res.render("tasks",{
 
    })
});

router.get('/employees',(req,res)=>{
    res.render("employees",{
    })
});

router.get('/cards',(req,res)=>{
    res.render("cards",{
    })
});

router.get('/add',(req,res)=>{
    res.render('add_user',{ title: "Add user" });
});

/* 
    ===================
    End Rendering all pages
    ===================
*/






/* 
    ===================
       All routings
    ===================
*/


//Adding project
router.post('/addproject', upload,(req,res)=>{

    const project = new Project({
        projectName: req.body.projectname,
        projectLocation: req.body.projectlocation,
        cost: req.body.cost,
        startDate: req.body.startDate,
        endDate:req.body.endDate,
    });

    project.save((err)=>{
        if (err) {
            res.json({ message: err.message, type: 'danger'}); 
        }else{
            req.session.message = {
                type : 'success',
                message : 'User added success',
            };
            
        res.redirect("/addproject");     
        }
    }) 

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alert = errors.array()
        res.render('addproject', {
            alert
            })   
        }else{
            
        }        

});

//Adding tasks
router.post('/addtasks', upload,(req,res)=>{

    const project = new Project({
        taskName: req.body.projectname,
        taskType: req.body.projectlocation,
    });

    project.save((err)=>{
        if (err) {
            res.json({ message: err.message, type: 'danger'}); 
        }else{
            req.session.message = {
                type : 'success',
                message : 'User added success',
            };
            
        res.redirect("/addproject");     
        }
    }) 

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alert = errors.array()
        res.render('addproject', {
            alert
            })   
        }else{
            
        }        

});



router.get("/projectdivision",(req,res)=>{
    Project.find().exec((err,project)=>{
        if (err) {
            res.json({message: err.message});
        }else{
            res.render("projectdivision",{
                project:project,
            })
        }
    })
})

router.post("/projectdivision",upload,(req,res)=>{

    const projectdivision = new ProjectDivision({
        divisionName:req.body.divisionname,
        project:req.body.project,
    }); 

    projectdivision.save((err)=>{
        if (err) {
            res.json({ message: err.message, type: 'danger'}); 
        }else{
            req.session.message = {
                type : 'success',
                message : 'User added success',
            };
            
        res.redirect("/projectdivision");     
        }
    })
})

router.post("/tasks",upload,(req,res)=>{

    const task = new Task({
        taskName:req.body.taskname,
        taskType:req.body.tasktype,
    }); 

    task.save((err)=>{
        if (err) {
            res.json({ message: err.message, type: 'danger'}); 
        }else{
            req.session.message = {
                type : 'success',
                message : 'User added success',
            };
            
        res.redirect("/tasks");     
        }
    })
})



/* 
    ===================
      End All routings
    ===================
*/



/*
router.post('/add', upload,(req,res)=>{
    let checkemail = req.body.email;
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    User.findOne(checkemail,(err,user)=>{
        if (err) {
            console.log(err)
        }else{
            if (user == null) {
                console.log('2')
            }else{
                user.save((err)=>{
                    if (err) {
                        res.json({ message: err.message, type: 'danger'});
                    }else{
                        req.session.message = {
                            type : 'success',
                            message : 'User added success',
                        };
                        
                    res.redirect("/");     
                    }
                })
            }
        }
    })

    
});*/


//Get update form

router.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    User.findById(id,(err,user)=>{
        if (err) {
            res.redirect('/')
        }else{
            if (user == null) {
                res.redirect('/')
            }else{
                res.render("edit_users",{
                    title: "Edit User",
                    user : user,
                });
            }
        }
    })
});


//User update route

router.post("/update/:id",upload,(req,res)=>{
    let id = req.params.id;
    let new_image = "";

    if (req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync("./uploads/"+ req.body.old_image);
        } catch (err) {
            console.log(err);
        }
    }else{
        new_image = req.body.old_image;
    }

    User.findByIdAndUpdate(id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:new_image,
    },(err,result)=>{
        if (err) {
            res.json({ message: err.message, type:'danger'});
        }else{
            req.session.message = {
                type : 'success',
                message : 'Update user success',
            }
            res.redirect("/");
        }
    })
})

//Delete user router

router.get("/delete/:id",(req,res)=>{
    let id = req.params.id;
    User.findByIdAndRemove(id,(err,result)=>{
        if (result.image != '') {
            try {
                fs.unlinkSync('./uploads/'+result.image);
            } catch (err) {
                console.log(err);
            }
        }

        if (err) {
            res.json({ message: err.message });
        }else{
            req.session.message = {
                type : "info",
                message : "User deleted successfully",
            }
            res.redirect("/");
        }
    })
})


module.exports = router;