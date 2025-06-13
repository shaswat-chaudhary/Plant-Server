const JWT = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req?.header?.authorization;

    if (!authHeader || !authHeader?.startWith("Bearer")) {
        next("Authentication == failed");
    }
    const token = authHeader?.split(" ")[1];

    try {
        const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

        req.body.user = {
            userId: userToken.userId,
        }
        console.log(userToken, 'token');
        next();
    }
    catch (error) {
        console.log(error);
        next("Authentication failed")
    }
}


module.exports = { verifyToken };