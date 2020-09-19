const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, options, (err) => {
        if (err) throw err;
        console.log("Connected to DB...");
    });
};

module.exports = connectDB;
