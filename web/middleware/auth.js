require('dotenv').config()
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            
            const decoded = jwt.verify(token,jwtSecret);
            

            if (!decoded) {
                return res.status(404).json({success: false , message: "User not found with this token"})

            }

            req.user = decoded;
            // console.log(decoded);
            

            next();
        } catch (error) {
            return res.status(401).json({success: false , message: "Not authorized, token failed"})
        }
    } else {
        return res.status(401).json({success: false , message: "No token provided, authorization denied"})
    }
};

const allowRoles = (...roles) => {
  return (req, res, next) => {
      console.log(req.user.user.role);
      if(!roles.includes(req.user.user.role)){
          return res.status(403).json({success: false , message: "Not authorized to access this route"})
      }
      next();
  }
}

module.exports = { protect, allowRoles };