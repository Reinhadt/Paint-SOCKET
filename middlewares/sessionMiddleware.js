const session = require("express-session");

const sessionMiddleware = session({
    name: "connect.sid",
    secret: "cats",
    store: new(require('connect-mongo')(session))({
        url: 'mongodb://localhost:27017/googlelogin'
    })
})

module.exports = sessionMiddleware