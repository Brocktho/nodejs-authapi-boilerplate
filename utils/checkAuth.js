const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).json({ err: "Not authenticated" });
    }
    return;
};

module.exports = checkAuth;
