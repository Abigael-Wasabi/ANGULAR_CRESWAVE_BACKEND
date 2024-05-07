const express=require('express');
const router = express.Router();
const {addTask,completeTask,undoComplete, getTasks, deleteTask} = require('../controllers/tasks');

router.post("/addtask", addTask);
router.post("/complete", completeTask);//wb
router.post("/undocomplete", undoComplete);//wb
router.get("/gettasks", getTasks);
router.delete("/deletetask", deleteTask);

module.exports = router; 