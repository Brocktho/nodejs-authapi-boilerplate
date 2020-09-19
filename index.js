const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/db");
const User = require("./models/User");

//Routes
const auth = require("./routes/auth/index");
const admin = require("./routes/admin/index");
const protected = require("./routes/protected/index");

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/user/", protected);

connectDB();

app.get("/p", (req, res) => {
    const user = new User({
        name: "Mary Smith",
        email: "marysmith@gmail.com",
        password: "marysmithiscool",
        username: "msmith",
    });
    user.save((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});
