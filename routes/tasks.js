const express=require('express');
const router = express.Router();
const {addTask,editTask, getTasks, deleteTask} = require('../controllers/tasks');

router.post("/addtask", addTask);//wb
router.patch("/edittask", editTask);//wb
router.get("/gettasks", getTasks);//wb
router.delete("/deletetask", deleteTask);

module.exports = router;  