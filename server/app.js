const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const dbConfig = require('./db/dbConfig');
const {signupQuery, getAllUsersQuery} = require('./db/queries');
const conn_init = require('./db/connection');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const restaurantRouter = require('./routes/restaurantRoutes');

const app = express();
conn_init();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10kb" }));
// const allowOrigins = ['http://localhost:3000']
// const corsOptions = {
//   credentials: true,
//   origin: function(origin, callback) {
//     if (allowOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }



app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/restaurants', restaurantRouter);

module.exports = app;