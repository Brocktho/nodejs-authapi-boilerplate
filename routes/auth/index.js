const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const hashPass = require("../../utils/hashPass");
const comparePass = require("../../utils/comparePass");

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email }, (err) => {
        if (err) throw err;
    });

    if (!user) res.status(401).json({ err: "Email doesn't exist" });

    const isValidPass = await comparePass(req.body.password, user.password);

    if (!isValidPass)
        res.status(403).json({ err: "Wrong email/password combination" });

    const token = jwt.sign(
        {
            data: { name: user.name, email: user.email },
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });

    res.json(token);

    // res.json({
    //     status: "Authenticated",
    // });
});

router.post("/register", async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.email }, (err) => {
        if (err) throw err;
    });
    if (foundUser) {
        res.status(401).json({ err: "Email already exists" });
        return;
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    const hash = await hashPass(req.body.password);
    user.password = await hash;

    user.save((err) => {
        if (err) throw err;
    });
    res.json({
        status: "Registered",
    });
});

module.exports = router;
