const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');
const {
    createUserTable, 
    createRestaurantTable, 
    createItemSequence, 
    createItemsTable
} = require('./queries');

const connFunc = async () => {
    const connection = await oracledb.getConnection(dbConfig); 
    if(connection) {
        console.log('db connection is established...');
        // await connection.execute(`create table test (id number)`);
        
        try {
            await connection.execute(createItemsTable);
            await connection.execute(createItemSequence);
            await connection.execute(createRestaurantTable);
            await connection.execute(createUserTable);
            
        } catch (err) {
            if(err.errorNum != 955)
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
    return connection;
}



module.exports = connFunc;