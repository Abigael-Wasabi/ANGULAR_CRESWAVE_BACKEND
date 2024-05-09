const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY; 
const users = require('../models/users');

const signUp = async (req, res, next) => {
    try{
      const { username, email, password, } = req.body;
      if ( !username || !email || !password) {
        console.log("All details must be filled.")
        return res.status(400).json({ message: 'All details must be filled.' });
      }
      const existingUser = await users.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(400).json({ message: `User with email ${email} already exists.` });
      } 
   //!the password salt should be 10 when 20 it will take a long time to hash the password */
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await users.create({
        username: username,
        email: email,
        password: hashedPassword 
      });
      res.status(201).json({ message: 'User registration successful.', User: newUser });
      console.log(newUser);
    } catch (error) { 
      console.error('Error registering user: ', error);
      res.status(500).json({ message: 'Server error.' });
    }
    };

    const login = async (req, res)=>{
      try{
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(401).json({ error: [{ message: 'All fields are required' }] });
        }
        const user = await users.findOne({
          where: {
            email: email
          }
        });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({//!func used to create a new jwt
          userID:user.userID,
          username: user.username,
          email: user.email, 
        }, SECRET_KEY, { expiresIn: '1hr' });
        if (!token) {
          return res.status(500).json({ error: [{ message: 'Token generation failed' }] });
        }
        console.log(user);
        const userData = {
          message: 'Login successful',
          token: token
        };//!set a cookie in the http response//!convert json obj to string//!cookie accessed only on server side not client//prevent xss
        res.cookie('userData', JSON.stringify(userData), { httpOnly: true });
        return res.json({userData});
      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
      }
      
  };

  module.exports={signUp,login}