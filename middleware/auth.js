const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
      } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
    };
    
module.exports = { authenticateUser };