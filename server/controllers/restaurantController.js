const { getAllRestaurants, addItemQuery, getAllItemsQuery } = require('./../db/queries');
const oracledb = require('oracledb');

const dbConfig = require('./../db/dbConfig');

exports.getAllRestaurants = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {
        let vendors = (await connection.execute(getAllRestaurants)).rows;

        res.status(201).json({
            status: 'success',
            vendors
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

exports.getAllItems = async (req, res, next) => {
    const rid = req.params.rid;
    const restaurantDetails = [
        rid
    ];

    const connection = await oracledb.getConnection(dbConfig);
    try {
        let items = await connection.execute(getAllItemsQuery, restaurantDetails, { outFormat: oracledb.OUT_FORMAT_OBJECT });

        res.status(201).json({
            status: 'success',
            items
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

exports.addItem = async (req, res, next) => {
    const rid = req.params.rid;
    const connection = await oracledb.getConnection(dbConfig);
    const itemDetails = [
        rid,
        req.body.name,
        req.body.price
    ];

    try {
        let item = await connection.execute(addItemQuery, itemDetails, { autoCommit: true });

        res.status(201).json({
            status: 'success',
            item
        })
    } catch (err) {
        // console.error(err);
        if (err.errorNum === 1) {
            console.error('unique constraint is violated');
            res.status(400).json({
                status: 'failed',
                message: 'already have an account. try login!'
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

exports.getAllRestaurantOrders = async (req, res, next) => {
    const rid = req.params.rid;
    const restaurantDetails = [
        rid
    ];

    const connection = await oracledb.getConnection(dbConfig);
    try {
        let orders = await connection.execute(ordersFromRestaurantQuery, restaurantDetails);

        res.status(201).json({
            status: 'success',
            orders
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

exports.getAllOrders = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {

        let orders = await connection.execute(`SELECT * FROM orders`);

        res.status(201).json({
            status: 'success',
            orders
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

