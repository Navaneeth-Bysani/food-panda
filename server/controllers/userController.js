const { getAllUsersQuery, placeOrderQuery, insertOrderItem, getOrderedItems } = require('./../db/queries');
const oracledb = require('oracledb');
const dbConfig = require('./../db/dbConfig');

exports.getAllUsers = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    try {
        let users = await connection.execute(getAllUsersQuery);

        res.status(201).json({
            status: 'success',
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

exports.placeOrder = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);

    const orderedItems = req.body.items;
    if (!req.user) {
        req.user = {
            id: 1
        };
    }
    try {
        let order = await connection.execute(placeOrderQuery, {
            userId: req.user.id,
            rid: req.params.id,
            ids: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }, { autoCommit: true });
        const order_id = order.outBinds.ids[0];

        orderedItems.forEach(item => {
            connection.execute(insertOrderItem, [
                order_id,
                item.itemId,
                item.quantity
            ], { autoCommit: true })
        });

        res.status(201).json({
            status: 'success',
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

exports.getOrderDetails = async (req, res, next) => {
    const connection = await oracledb.getConnection(dbConfig);
    const orderDetails = [
        req.params.oid
    ];

    try {
        let orderedItems = await connection.execute(getOrderedItems, orderDetails, { outFormat: oracledb.OUT_FORMAT_OBJECT });

        res.status(201).json({
            status: 'success',
            orderedItems
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
// { outFormat: oracledb.OUT_FORMAT_OBJECT }