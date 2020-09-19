const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const mongoose = require("mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: "/admin",
});

const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
};

const router = AdminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
        cookieName: process.env.ADMIN_COOKIE_EMAIL,
        cookiePassword: process.env.ADMIN_COOKIE_PASS,
        authenticate: async (email, pass) => {
            if (email == ADMIN.email && pass == ADMIN.pass) {
                return ADMIN;
            }
            return null;
        },
    },
    null,
    {
        resave: false,
        saveUninitialized: true,
    }
);

module.exports = router;
