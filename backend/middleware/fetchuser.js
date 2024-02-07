var jwt = require('jsonwebtoken');
const JWT_SECRET = 'harryisagoodboy'
// const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = (req, res, next) => {
    //get user from jwt token and id req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authneticate using valid token" });

    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "please authneticate using valid token" });

    }
}

module.exports = fetchuser;