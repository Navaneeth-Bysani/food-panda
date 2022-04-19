const {getAllUsersQuery} = require('./../db/queries');
const oracledb = require('oracledb');
const dbConfig = require('./../db/dbConfig');

exports.getAllUsers = async(req,res,next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {
        let users = await connection.execute(getAllUsersQuery);
        
        res.status(201).json({
            status : 'success',
            users
        })
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
        }
    }
}

exports.placeOrder = async(req,res,next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const userDetails = [
        req.body.userId,
        req.body.name,
        req.body.phone,
        req.body.password
    ];

    try {
        let user = await connection.execute(signupQuery, userDetails, {autoCommit : true});
        
        res.status(201).json({
            status : 'success',
            user
        })
    } catch (err) {
        // console.error(err);
        if(err.errorNum === 1) {
            console.error('unique constraint is violated');
            res.status(400).json({
                status : 'failed',
                message : 'already have an account. try login!'
            });
            next();
        }
    } finally {
        if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
        }
    }
}