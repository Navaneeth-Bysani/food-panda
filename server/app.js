const express = require('express');

const app = express();

app.get('/login', (req,res) => {
    
    const userDetails = {
        email : 'navaneeth@gmail.com',
        password : 'navaneeth'
    };

    // //find if user email is present in db
    // let email = select email from users where email = userDetails.email;
    // if(email != NULL) {
    //     //check password is correct or not
    //     select pwd from users where email = userDetails.email;
    //     if(pwd == userDetails.password) {
    //         //user exists
    //     } else {
    //         //password incorrect
    //     }
    // }

});
module.exports = app;
