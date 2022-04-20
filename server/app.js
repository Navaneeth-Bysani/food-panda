const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConfig = require('./db/dbConfig');
const { signupQuery, getAllUsersQuery } = require('./db/queries');
const conn_init = require('./db/connection');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const restaurantRouter = require('./routes/restaurantRoutes');

const app = express();
conn_init();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser())

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// }); 

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);

module.exports = app;