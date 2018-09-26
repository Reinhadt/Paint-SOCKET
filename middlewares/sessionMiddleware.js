require('../config/config')

const session = require("express-session");

const sessionMiddleware = session({
    name: "connect.sid",
    secret: "cats",
    store: new(require('connect-mongo')(session))({
        url: process.env.URLDB
    })
})

module.exports = sessionMiddleware