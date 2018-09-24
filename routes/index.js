const express = require('express')
let app = express()

app.use(require('./login'))
app.use(require('./me'))

module.exports = app