const {signupQuery, loginQuery, vendorSignUpQuery, vendorLoginQuery} = require('./../db/queries');
const oracledb = require('oracledb');
const dbConfig = require('./../db/dbConfig');

exports.login = async(req,res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const userDetails = [
        req.body.email,
        req.body.password
    ];

    try {
        let user = await connection.execute(loginQuery, userDetails);
        if(user.rows.length !== 0) {
            res.status(201).json({
                status : 'success',
                message : 'user exists',
                user
            })
        } else {
            res.status(400).json({
                status : 'failed',
                message : 'either the email or the password is wrong'
            })
        }
        
    } catch (err) {
        // console.error(err);
        if(err.errorNum == 1) {
            console.error('unique constraint is violated');
            res.status(400).json({
                status : 'failed',
                message : 'already have an account. try login!'
            });
            next();
        } else {
            console.log(err);
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

exports.signup = async(req,res,next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const userDetails = [
        req.body.email,
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

exports.signupVendor = async(req,res,next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const vendorDetails = [
        req.body.name,
        req.body.id,
        req.body.email,
        req.body.password,
        req.body.description,
        req.body.phone,
    ];

    try {
        let vendor = await connection.execute(vendorSignUpQuery, vendorDetails, {autoCommit : true});
        
        res.status(201).json({
            status : 'success',
            vendor
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

exports.loginVendor = async(req,res,next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const vendorDetails = [
        req.body.email,
        req.body.password
    ];
    
    try {
        let vendor = await connection.execute(vendorLoginQuery, vendorDetails);
        
        if(vendor.rows.length !== 0) {
            res.status(201).json({
                status : 'success',
                message : 'vendor exists',
                vendor
            })
        } else {
            res.status(400).json({
                status : 'failed',
                message : 'either the email or the password is wrong'
            })
        }
        
    } catch (err) {
        
        if(err.errorNum == 1) {
            console.error('unique constraint is violated');
            res.status(400).json({
                status : 'failed',
                message : 'already have an account. try login!'
            });
            next();
        } else {
            console.error(err);
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