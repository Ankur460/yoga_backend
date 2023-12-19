const jwt = require('jsonwebtoken');

// Middleware function for verifying JWT token
const verifyToken = (req, res, next) => {
   // console.log(req);
  const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
 console.log(token+"....");
  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is required.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key');
     
    // Attach user information to the request object
    req.user = decoded;
   // console.log(req.user+'Hello');
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};


module.exports=verifyToken;
