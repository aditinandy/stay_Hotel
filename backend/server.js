const express = require('express')
const db = require('./models')
const cors = require('cors');

const app = express()

app.use(cors())
app.options('*', cors())

const router = (global.router = (express.Router()));
const signup = require('./routers/signup.routers')
const registerhotel = require('./routers/register_hotels.routers')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', signup);
app.use('/addhotel', registerhotel);
app.use(router);


const cron = require('node-cron');

let count = 0
const job = cron.schedule('* * * * * *', () => {
    count = count + 1
    console.log('executed',);
});

job.start();



app.listen(3000, () => {
    console.log('Listen port', 3000);
})