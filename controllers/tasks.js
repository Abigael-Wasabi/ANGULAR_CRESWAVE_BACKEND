require('dotenv').config();
const Tasks = require('../models/tasks');

const addTask = async (req, res, next) => {
    try{
      const { title, description} = req.body;
      console.log("Incoming request:", req.body);
      if (!title && !description) {
        console.error("Please provide all details");
        return res.status(400).json({ message: 'Please provide all details' });
      }
      const existingTask = await Tasks.findOne({ where: { title: title } });
      if (existingTask) {
        return res.status(400).json({ message: `Task with name ${title} already exists.`});
      } 
      const newTask = await Tasks.create({ title, description, status: 'incomplete' });
      res.status(201).json({ message: 'Task added successful.', Task: newTask});
      console.log(newTask);
    } catch (error) { 
      console.error('Error adding task: ', error);
      res.status(500).json({ message: 'Server error.' });
    }
    };

 
    const editTask = async (req, res) => {
      try {
        const { taskId, title, description, status } = req.body;
        if (!taskId) {
          return res.status(400).json({ message: 'Please provide a taskId' });
        }
        let task = await Tasks.findById(taskId);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        if (title) {
          task.title = title;
        }
        if (description) {
          task.description = description;
        }
        if (status) {
          task.status = status;
        }
        await task.save();
        return res.status(200).json({ message: 'Task updated successfully', task });
      } catch (error) {
        console.error('Error editing task:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    
 

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

module.exports={ addTask, editTask, getTasks, deleteTask }