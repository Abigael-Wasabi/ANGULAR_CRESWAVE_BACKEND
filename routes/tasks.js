const express=require('express');
const router = express.Router();
const {addTask,editTask, getTasks, deleteTask} = require('../controllers/tasks');

router.post("/addtask", addTask);
router.patch("/edittask", editTask);
router.get("/gettasks", getTasks);//wb
router.delete("/deletetask", deleteTask);

module.exports = router;  