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
app.get('/createorder:orderID/:calories/:total/:tip/:total_after_tip/:date', (req, res) => {
    items = []
    pool
    .query(`INSERT INTO orders VALUES (${req.params.orderID},${req.params.calories},${req.params.total},${req.params.tip},${req.params.total_after_tip},${req.params.date});`.replace(/:/g, ""))
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

//MANAGER GUI//

// Get inventory
app.get('/inventory', (req, res) => {
    items = []
pool
.query("SELECT inventory.id, inventory.item_id, inventory.name, items.category, items.price, inventory.item_quantity, inventory.num_sold, inventory.vendor, inventory.purchase_price, inventory.batch_quantity FROM inventory JOIN items on items.id = inventory.item_id order by inventory.item_id;")
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

// Update inventory
app.get('/updateinventory/:name/:itemid', (req, res) => {
    items = []
    pool
    .query(`UPDATE inventory SET name = ${req.params.name} WHERE item_id = ${req.params.itemid}`.replace(/:/g, ""))
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

// Update items
app.get('/updateitem/:name/:price/itemid', (req, res) => {
    items = []
    pool
    .query(`UPDATE items SET name = ${req.params.name}, price = ${req.params.price} WHERE id = ${req.params.itemid}`.replace(/:/g, ""))
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

// Add items
app.get('/additem/:itemid/:name/:category/:price/:calories', (req, res) => {
    items = []
    pool
    .query(`INSERT INTO items (id,name,category,price,calories) VALUES (${req.params.itemid},${req.params.name},${req.params.category},${req.params.price},${req.params.calories})`.replace(/:/g, ""))
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

// Add inventory
app.get('/addinventory/:id/:itemid/:name/:quantity:/num_sold/:vendor/:purchase_price/:batch_quantity', (req, res) => {
    items = []
    pool
    .query(`INSERT INTO inventory (id,item_id,name,item_quantity,num_sold,vendor,purchase_price,batch_quantity) VALUES (${req.params.id},${req.params.itemid},${req.params.name},${req.params.quantity},${req.params.num_sold},${req.params.vendor},${req.params.purcahse_price},${req.params.batch_quantity})`.replace(/:/g, ""))
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

// Delete item
app.get('/deleteitem/:itemid', (req, res) => {
    items = []
    pool
    .query(`DELETE FROM inventory where item_id = ${req.params.itemid}`.replace(/:/g, ""))
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

// Delete inventory
app.get('/deleteinventory/:itemid', (req, res) => {
    items = []
    pool
    .query(`DELETE FROM items where id = ${req.params.itemid}`.replace(/:/g, ""))
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

// RESTOCK/EXCESS

// Count item
app.get('/countitem/:from/:to/:itemuuid', (req, res) => {
    items = []
    pool
    .query(`SELECT COUNT(order_items.uuid) from orders INNER JOIN order_items on orders.order_id = order_items.order_id WHERE datetime BETWEEN ${req.params.from} and ${req.params.to} AND order_items.item_id = ${req.params.itemuuid};`.replace(/:/g, ""))
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

//Count topping
app.get('/counttopping/:from/:to/:topping', (req, res) => {
    items = []
    pool
    .query(`SELECT COUNT(order_toppings.uuid) from orders INNER JOIN order_toppings on orders.order_id = order_toppings.order_id WHERE datetime BETWEEN ${req.params.from} and ${req.params.to} AND order_toppings.item_id = ${req.params.topping};`.replace(/:/g, ""))
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

// SALES/SALES TOGETHER

// CONNECTOR

// Get item from category
app.get('/getitems/:category', (req, res) => {
    items = []
    pool
    .query(`SELECT * FROM items WHERE category=${req.params.category} ORDER BY id`.replace(/:/g, ""))
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

// Get prices
app.get('/getprice', (req, res) => {
        items = []
    pool
    .query("SELECT name, price FROM items")
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
