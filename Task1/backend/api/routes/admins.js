var express = require('express');
var adminModel = require('../models/admin');
var userModel = require('../models/user')
var router = express.Router();


/* GET users listing. */
router.get('/users', function(req, res, next) {
    userModel.find(function(err,user){
      res.json(user);
    })
})

// router.get('/users/:userId', function(req, res, next) {
//   userModel.findOne({
//     task:req.body.task,
//     description:req.body.description,
//         _UserID:req.params.userId
//       }).then((task)=>{
//         res.send(task);
//       })
//   })

// router.get('/users/:listId/tasks', (req, res, next)=> {
//   adminModel.find({
//     _UserID:req.params.listId
//   }).then((tasks)=>{
//     res.send(tasks);
//   })
// });

// router.get('/taskss/:listId/tasks/:taskId', (req, res, next)=> {
//   adminModel.findOne({
//     _id:req.params.taskId,
//     _UserID:req.params.listId
//   }).then((task)=>{
//     res.send(task);
//   })

//Admin add task

// router.post('/addtasks', function(req, res, next) {
//     var taskDetails = new adminModel({
//       task: req.body.Task,
//       description: req.body.Description
//     });
   
//     taskDetails.save().then(doc=>{
//       res.status(201).json({
//           msg:"Task Saved",
//           results:doc,
//           status:'success'
//       });
//   })
//   .catch(err=>{
//       res.json(err);
//   });

// });



router.post('/users/:listId/tasks', function(req, res, next) {
  var taskDetails = new adminModel({
    task: req.body.task,
    description: req.body.description,
    _UserID:req.params.listId,
    completed:false
  });
 
  taskDetails.save().then(doc=>{
    res.status(201).json({
        msg:"Task Saved",
        results:doc,
        status:'success'
    });
})
.catch(err=>{
    res.json(err);
});
});

router.get('/users/:listId/tasks/:taskId', (req, res, next)=> {
  adminModel.find({
    _UserID:req.params.listId,
    _id:req.params.taskId
  }).then((tasks)=>{
    res.send(tasks);
  })
});



router.patch('/users/:listId/tasks/:taskId',(req,res)=>{
  adminModel.findOneAndUpdate({
    _id:req.params.taskId,
    _UserID:req.params.listId
  }, {
        $set: req.body
    }
  ).then(()=>{
    res.send({message:'Updated'});
    // res.sendStatus(200);
  })
});


router.delete('/users/:listId/tasks/:taskId',(req,res)=>{
  adminModel.findOneAndRemove({
    _id:req.params.taskId,
    _UserID:req.params.listId
  }).then((removeTaskDoc)=>{
    // res.send(removeTaskDoc);
    res.send({
      message:"Deleted Successfully"
    })
  })
});


module.exports = router;
