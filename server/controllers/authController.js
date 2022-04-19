const oracledb = require('oracledb');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {signupQuery, loginQuery, vendorSignUpQuery, vendorLoginQuery, findUserById} = require('./../db/queries');
const dbConfig = require('./../db/dbConfig');

const JWT_SECRET = 'our little secret';
const JWT_EXPIRES_IN = '90d';
const JWT_COOKIE_EXPIRES_IN = 90;
const NODE_ENV = 'development';

const signToken = id => {
    return jwt.sign({id : id}, JWT_SECRET, {
        expiresIn : JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user[4]);

    const cookieOptions = {
        expires : new Date(Date.now() + JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly : true
    }
    if(NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie("jwt", token, cookieOptions);
    
    res.status(statusCode).json({
        status : "success",
        user : {
            email : user[0],
            name : user[1],
            id : user[4]
        },
        token
    })
}

exports.verifyJwtToken = async (req, res, next) => {
    // 1) Getting token and check ff it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    // 2) Verifying token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
  
    req.jwtPayload = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
}

exports.loggedInUser = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const userDetails = [
        req.jwtPayload.id
    ];
    
    try {
        let currentUser = await connection.execute(findUserById, userDetails);
        let user = currentUser.rows[0];
        if(currentUser.rows.length !== 0) {
            req.user = {
                email : user[0],
                name : user[1],
                phone : user[2],
                id : user[4]
            };

            next();
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

exports.login = async(req,res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const userDetails = [
        req.body.email,
        req.body.password
    ];
    
    try {
        let user = await connection.execute(loginQuery, userDetails);
        if(user.rows.length !== 0) {
            createSendToken(user.rows[0], 200, res);
            // res.status(201).json({
            //     status : 'success',
            //     message : 'user exists',
            //     user
            // })
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