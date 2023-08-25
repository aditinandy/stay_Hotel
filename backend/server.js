const express = require('express')
const db = require('./models')

const app = express()

const router = (global.router = (express.Router()));
const signup = require('./routers/signup.routers')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', signup);
app.use(router);


app.listen(3000, () => {
  console.log('Listen port', 3000);
})