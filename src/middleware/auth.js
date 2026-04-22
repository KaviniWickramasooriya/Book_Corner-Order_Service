const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Both Auth and Order services MUST have the exact same JWT_SECRET in AWS
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message); // This will show up in AWS CloudWatch!
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;