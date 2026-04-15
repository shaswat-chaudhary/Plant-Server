const JWT = require('jsonwebtoken');

// const tokenVerify = (req, res, next) => {

//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Authentication failed" });
//   }
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer")) {
//       return res.status(401).json({ message: "Authentication failed" });
//     }
//     const token = authHeader.split(" ")[1];
//     const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

const verifyToken = (token) => {
  try {
    return JWT.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
}

const authorize = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.admin.role} is not authorized to access this role`,
      });
    }
    next();
  }
}

module.exports = { verifyToken, authorize, };