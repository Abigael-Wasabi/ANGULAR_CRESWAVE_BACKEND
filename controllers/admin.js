const sequelize = require('../config/db');
const user=require('../models/users');

const getUsers = async (req, res)=>{
    try{
      const users=await user.findAll();
      console.log(users);
      res.json(users);
    }catch(error){
        console.log('Error fetching users',error);
        res.status(500).json({error: 'Server error'});
    }
};
module.exports = getUsers;