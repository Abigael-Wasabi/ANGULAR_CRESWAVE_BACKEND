require('dotenv').config();
const Tasks = require('../models/tasks');

const addTask = async (req, res, next) => {
    try{
      const { task, subtask } = req.body;
      console.log("Incoming request:", req.body);
      if (!task) {
        console.error("Task name is empty.");
        return res.status(400).json({ message: 'Please insert a task.' });
      }
      const existingTask = await Tasks.findOne({ where: { task: task } });
      if (existingTask) {
        return res.status(400).json({ message: `Task with name ${task} already exists.`});
      } 
      const newTask = await Tasks.create({ task, subtask, status: 'incomplete' });
      res.status(201).json({ message: 'Task added successful.', Task: newTask});
      console.log(newTask);
    } catch (error) { 
      console.error('Error adding task: ', error);
      res.status(500).json({ message: 'Server error.' });
    }
    };

const completeTask = async (req, res, next) => {
  try {
      const { taskId } = req.body;
      if (!taskId) {
          return res.status(400).json({ message: 'Please provide a taskId.' });
      }
      const updatedTask = await Tasks.update({ status: 'completed' }, { where: { taskID: taskId } });
      res.status(201).json({ message: 'Task completed successfully.', Task: updatedTask });
      console.log(updatedTask);
  } catch (error) {
      console.error('Error completing task: ', error);
      res.status(500).json({ message: 'Server error.' });
  }
};
 
// const editTask = async (req, res) => {
//   try {
//     const 
//   }
// }
 

const undoComplete = async (req, res, next) => {
            try{
              const { taskId } = req.body;
              if (!taskId) {
                return res.status(400).json({ message: 'Please providea task id.' });
              }
              const updatedTask = await Tasks.update({ status: 'incomplete' }, { where: { taskID: taskId } });
               
              res.status(201).json({ message: 'complete task undone.', Task: updatedTask});
              console.log(updatedTask);
            } catch (error) { 
              console.error('Error undoing: ', error);
              res.status(500).json({ message: 'Server error.' });
            }
            };
const getTasks = async (req, res) => { 
    try {
        const tasks = await Tasks.findAll();
        console.log(tasks)
        res.json(tasks); 
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const deletedTask = await Tasks.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Error deleting task' });
    }
};

module.exports={ addTask, completeTask, undoComplete, getTasks, deleteTask }