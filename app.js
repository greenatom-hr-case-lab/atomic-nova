const express = require('express')
const bodyParser = require('body-parser');
const config = require('config')
const mongoose = require('mongoose')
const path = require('path');
const baseRoute = require('./routes/base.route')
const auth_api = require('./routes/auth.routes')
const PORT = config.get('port') || 3000

const app = express() 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',baseRoute)
app.use('/user',auth_api)
app.listen(PORT, () => console.log('Memory would be out soon.. btw port is ${PORT}'))