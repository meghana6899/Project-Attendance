const express = require('express');

const app = express();

const path=require('path');

const pool = require('./configdb/db');


app.use(express.urlencoded({ extended: false }));


// const router=require('./router/route');
const employeeRoute = require('./routes/employeeDetailsRoute')
const signUpUser=require('./routes/loginsignup');
const authRoutes = require('./routes/authRoutes.js');
const authMiddleware = require('./middleware/authMiddleware.js');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminCRUDRoutes');
const workingHoursRoute = require('./routes/workingHoursperDayRoute.js')

const cors = require('cors');

app.use(cors());


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/api',signUpUser)
app.use('/api/auth', authRoutes );
app.use('/api/protected', authMiddleware.authMid, (req, res) => {
    res.json({msg: "You are authorized", user: req.user})
})
app.use('/api/users', userRoutes )

app.use('/api/admin', adminRoutes )

app.use('/api/details', employeeRoute )
app.use('/api/hours', workingHoursRoute)
pool.query('SELECT 1').then(() => {
    console.log("MySQL connected");
    app.listen(3000, () => {
        console.log(`server running at port: 3000`)
    });
}).catch((error) => {
    console.log(error);
})
