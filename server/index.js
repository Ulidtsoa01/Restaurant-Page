const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const app = express();
const port = 3000;

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});
	 	 	 	
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    items = []
    pool
    .query('SELECT * FROM items;')
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

//SERVER GUI//

// Get orderid
app.get('/orderid', (req, res) => {
    items = []
    pool
    .query('SELECT order_id from orders ORDER BY order_id DESC LIMIT 1;')
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Get item uuid
app.get('/itemuuid', (req, res) => {
    items = []
    pool
    .query("SELECT uuid from order_items ORDER BY uuid DESC LIMIT 1;")
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Get topping uuid
app.get('/toppinguuid', (req, res) => {
    items = []
    pool
    .query("SELECT uuid from order_toppings ORDER BY uuid DESC LIMIT 1;")
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Get item quantity
app.get('/quantity/:id', (req, res) => {
    items = []
    pool
    .query(`SELECT item_quantity from inventory WHERE item_id=${req.params.id}`.replace(/:/g, ""))
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Get id from name
app.get('/itemid/:name', (req, res) => {
    items = []
    pool
    .query(`SELECT id FROM items WHERE name=${req.params.name}`.replace(/:/g, ""))
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Insert order table
app.get('/createorder/:orderID/:calories/:total/:tip_double/:total_after_tip/:after_tip/:date', (req, res) => {
    items = []
    pool
    .query(`INSERT INTO orders VALUES (${req.params.orderID},${req.params.calories},${req.params.total},${req.params.tip_double},${req.params.total_after_tip},${req.params.after_tip});${req.params.date}`.replace(/:/g, ""))
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Update inventory after order
app.get('/updateinventoryserver/:itemid', (req, res) => {
    items = []
    pool
    .query(`UPDATE inventory SET item_quantity=GREATEST(item_quantity-1,0) WHERE item_id=(${req.params.itemid});UPDATE inventory SET num_sold=num_sold+1 WHERE item_id=(${req.params.itemid});`.replace(/:/g, ""))
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Insert into order items
app.get('/insertitem/:uuid/:orderid/:subitem/:id/:name', (req, res) => {
    items = []
    pool
    .query(`INSERT INTO order_items VALUES (${req.params.uuid},${req.params.orderid},${req.params.subitem},${req.params.id},${req.params.name});`.replace(/:/g, ""))
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});

// Insert into order toppings
app.get('/inserttopping:uuid/:orderid/:subitem/:id/:name', (req, res) => {
    items = []
    pool
    .query(`INSERT INTO order_toppings VALUES (${req.params.uuid},${req.params.orderid},${req.params.subitem},${req.params.id},${req.params.name});`.replace(/:/g, ""))
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            items.push(query_res.rows[i]);
        }
        const data = {items: items};
        console.log(items);
        res.send(data);
        return;
    });
});


// app.get(, (req, res) => {
//     items = []
//     pool
//     .query(`${req.params.}`.replace(/:/g, ""))
//     .then(query_res => {
//         for (let i = 0; i < query_res.rowCount; i++){
//             items.push(query_res.rows[i]);
//         }
//         const data = {items: items};
//         console.log(items);
//         res.send(data);
//         return;
//     });
// });


// app.get(, (req, res) => {
    //     items = []
//     pool
//     .query()
//     .then(query_res => {
//         for (let i = 0; i < query_res.rowCount; i++){
//             items.push(query_res.rows[i]);
//         }
//         const data = {items: items};
//         console.log(items);
//         res.send(data);
//         return;
//     });
// });

 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`); 
});
