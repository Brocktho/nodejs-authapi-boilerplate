const router = require("express").Router();
const checkAuth = require("../../utils/checkAuth");

router.get("/protected", checkAuth, (req, res) => {
    res.json({
        status: "Auth",
    });
});

module.exports = router;
