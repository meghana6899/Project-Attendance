const express = require('express');

const app = express();

const path=require('path');

const pool = require('./configdb/db');


app.use(express.urlencoded({ extended: false }));


// const router=require('./routes/route');

const signUpUser=require('./routes/loginsignup');

const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/api',signUpUser)

pool.query('SELECT 1').then(() => {
    console.log("MySQL connected");
    app.listen(3000, () => {
        console.log(`server running at port: 3000`)
    });
}).catch((error) => {
    console.log(error);
})
