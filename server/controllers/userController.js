const {getAllUsersQuery, placeOrderQuery} = require('./../db/queries');
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
    // const userId
    const userid = req.user.id;
    const orderDetails = [
        req.user.id,
        req.params.rid
    ];
    try {
        let order = await connection.execute(placeOrderQuery, orderDetails, {autoCommit : true});
        
        res.status(201).json({
            status : 'success',
            order
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