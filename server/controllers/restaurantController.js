const {
    getAllRestaurants,
    addItemQuery,
    getAllItemsQuery,
    ordersFromRestaurantQuery,
    deleteItemQuery,
    updateItemQuery,
    getOrderedItems
} = require('./../db/queries');
const { promisify } = require('util');
const oracledb = require('oracledb');

const dbConfig = require('./../db/dbConfig');

exports.getAllRestaurants = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {
        let vendors = (await connection.execute(getAllRestaurants)).rows;
        // console.log(req.cookies)
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

exports.getOneRestaurant = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {
        let vendor = (await connection.execute(`SELECT name, description, email, phone FROM restaurants WHERE id = :rId`, [req.params.rId])).rows;

        res.status(201).json({
            status: 'success',
            vendor
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
    let rId;
    if (req.params.rid) {
        rId = req.params.rid;
    } else {
        rId = req.user.id;
    }

    const restaurantDetails = [
        rId
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
    const rid = req.user.id;
    const connection = await oracledb.getConnection(dbConfig);
    const itemDetails = [
        rid,
        req.body.name,
        req.body.price
    ];
    if (rid !== req.user.id) {
        res.status(401).json({
            status: 'You are not allowed to do this'
        })
        return;
    }

    try {
        let item = await connection.execute(addItemQuery, {
            rid: rid,
            name: req.body.name,
            price: req.body.price,
            ids: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }, { autoCommit: true });

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
    const rid = req.user.id;
    const restaurantDetails = [
        rid
    ];

    const connection = await oracledb.getConnection(dbConfig);
    try {
        let orders = await connection.execute(ordersFromRestaurantQuery, restaurantDetails, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        let items = {};
        let finalOrders = [...orders.rows];

        res.status(201).json({
            status: 'success',
            orders: orders.rows,
            items: items
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

        let orders = await connection.execute(`SELECT * FROM orders WHERE isCompleted = 'NO'`);
        // console.log(orders);
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

exports.deleteItem = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {
        //delete later
        if (!req.user) {
            req.user = {
                id: 'restaurant-01'
            }
        }
        const itemDetails = [
            req.params.id,
            req.user.id
        ];

        let deletedItem = await connection.execute(deleteItemQuery, itemDetails, { autoCommit: true });
        if (!deletedItem) {
            res.status(404).json({
                message: 'can not find the item in the restaurant'
            })
        }
        res.status(200).json({
            status: 'success',
            deletedItem
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

exports.updateItem = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {

        const itemDetails = [
            req.body.name,
            req.body.price,
            req.params.id,
            req.user.id
        ];

        let updatedItem = await connection.execute(updateItemQuery, itemDetails, { autoCommit: true });
        if (!updatedItem) {
            res.status(404).json({
                message: 'can not find the item in the restaurant'
            })
            return;
        }

        res.status(200).json({
            status: 'success',
            updatedItem
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

exports.finishOrder = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    // console.log('1');
    try {

        const orderDetails = [
            req.params.oid
        ];
        // console.log('2');
        let finishedOrder = await connection.execute(`UPDATE orders SET isCompleted = 'YES' WHERE id = :oid`, orderDetails, { autoCommit: true });
        if (!finishedOrder) {
            res.status(404).json({
                message: 'can not find the item in the restaurant'
            })
            return;
        }

        res.status(200).json({
            status: 'success',
            finishedOrder
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