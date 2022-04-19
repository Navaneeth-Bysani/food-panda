const express = require('express');
const oracledb = require('oracledb');

const dbConfig = require('./db/dbConfig');
const {signupQuery, getAllUsersQuery} = require('./db/queries');
const conn_init = require('./db/connection');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const restaurantRouter = require('./routes/restaurantRoutes');

const app = express();
conn_init();
app.use(express.json({ limit: "10kb" }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);

module.exports = app;