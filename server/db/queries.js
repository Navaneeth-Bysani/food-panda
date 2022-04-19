//creating table queries

const createUserTable = `
    CREATE TABLE users (
        email VARCHAR(40) UNIQUE,
        name VARCHAR(30),
        phone VARCHAR(12),
        password VARCHAR(10),
        id NUMBER PRIMARY KEY
    )
`;

const createRestaurantTable = `
        CREATE TABLE restaurants (
            name VARCHAR(40),
            id VARCHAR(20) PRIMARY KEY,
            email VARCHAR(40),
            password VARCHAR(10),
            description VARCHAR(1024),
            phone VARCHAR(12)
        )
`;

const createItemsTable = `
        CREATE TABLE items (
            id NUMBER PRIMARY KEY,
            rId VARCHAR(20),
            name VARCHAR(20),
            price NUMBER
        )
`;

const createOrderTable = `
        CREATE TABLE orders (
            id NUMBER PRIMARY KEY,
            userId NUMBER,
            order_time TIMESTAMP,
            rid VARCHAR(20),
            
        )
`;
// creating sequence queries
const createItemSequence = `
            CREATE SEQUENCE itemSeq
            START WITH 1
            INCREMENT BY 1
`;

const createUserSequence = `
            CREATE SEQUENCE userSeq
            START WITH 1
            INCREMENT BY 1
`;

const createOrderSequence = `
            CREATE SEQUENCE orderSeq
            START WITH 1
            INCREMENT BY 1
`;

//insert queries
const signupQuery = `
        INSERT INTO users VALUES (
            :email,
            :name,
            :phone,
            :password,
            userSeq.nextVal
        )
`;

const vendorSignUpQuery = `
            INSERT INTO restaurants VALUES (
                :name,
                :id,
                :email,
                :password,
                :description,
                :phone
            )
`;

const addItemQuery = `
            INSERT INTO items VALUES (
                itemSeq.nextVal,
                :rid,
                :name,
                :price
            )
`;

//select queries
const vendorLoginQuery = `
                SELECT * FROM restaurants WHERE email = :email AND password = :password
`;

const getAllUsersQuery = `
            SELECT * FROM users
`;

const getAllRestaurants = `
            SELECT * FROM restaurants
`;

const loginQuery = `
            SELECT * FROM users WHERE email = :email AND password = :password
`;

const getAllItemsQuery = `
            SELECT * FROM items WHERE rid = :rid
`;

const findUserById = `
            SELECT * FROM users WHERE id = :id
`;
module.exports = {
    createUserTable,
    signupQuery,
    getAllUsersQuery,
    loginQuery,
    createRestaurantTable,
    getAllRestaurants,
    vendorSignUpQuery,
    vendorLoginQuery,
    createItemSequence,
    createItemsTable,
    addItemQuery,
    getAllItemsQuery,
    createUserSequence,
    findUserById,
    createOrderSequence
};