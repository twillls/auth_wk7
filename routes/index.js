const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        // render the home view with dynamic data
        res.render('home', { people: result });
    })
})

// localhost:3000/anything

router.get('/:id', (req, res) => {
    console.log('hit a dynamic route');
    console.log(req.params.id);

    let query = `SELECT * FROM tbl_bio WHERE profID="${req.params.id}"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); //should see obj wrapped in array

        // render the home view with dynamic data
        // res.render('home', { people: result });
    })
})

module.exports = router;