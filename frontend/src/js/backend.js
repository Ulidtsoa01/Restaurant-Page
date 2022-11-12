import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
});

// SERVER

// Get orderid, route: '/orderid'
// Returns the most recent order id
export async function getLatestOrderId() {
    let result = await instance.get('/orderid');
    return result.data.items[0].order_id;
}

// Get topping uuid, route: '/toppinguuid'
// Returns the most recent topping uuid
export async function getLatestToppingUUID() {
    let result = await instance.get('/toppinguuid');
    return result.data.items[0].uuid;
}

// Get item uuid, route: '/itemuuid'
// Returns the most recent item uuid
export async function getLatestItemUUID() {
    let result = await instance.get('/itemuuid');
    return result.data.items[0].uuid;
}

// Get item quantity: route'/quantity:id'
// Returns the item quantity
export async function getQuantityById(itemid) {
    let result = await instance.get('/quantity', { 
        params: {
            id: itemid,
        },
    });
    return result.data.items[0].item_quantity;
}

// Get id from name: route'/itemid:name'
// Returns the item id
export async function getIdFromName(name) {
    let result = await instance.get('/itemid',{
        params: {name: name}
    });
    return result.data.items[0].id;
}

// Insert order table, route'/createorder:orderID/:calories/:total/:tip/:total_after_tip/:date'
// Insert into order table
export async function insertOrder(orderid, cals, total, tip, total_after_tip, date) {
    let result = await instance.get('/createOrder',{
        params: {
            orderID: orderid,
            calories: cals,
            total: total,
            tip: tip,
            total_after_tip: total_after_tip,
            date: date,
        }
    });
    return;
}

// Update inventory after order, route: '/updateinventoryserver:itemid'
// Adds one to inventory table
export async function incrementInventory(itemid) {
    let result = await instance.get('/updateinventoryserver',{
        params: {itemid: itemid}
    });
    return;
}

// Insert into order items, route: '/insertitem:uuid/:orderid/:subitem/:id/:name'
// Inserts into order_items table
export async function insertOrderItems(uuid, orderid, subitem, id, name) {
    let result = await instance.get('/insertitem',{
        params: {
            uuid: uuid,
            orderid: orderid,
            subitem: subitem,
            id: id,
            name: name,
        }
    });
    return;
}

// Insert into order toppings, route: '/inserttopping:uuid/:orderid/:subitem/:id/:name'
// Inserts into order_toppings table
export async function insertOrderToppings(uuid, orderid, subitem, id, name) {
    let result = await instance.get('/inserttopping',{
        params: {
            uuid: uuid,
            orderid: orderid,
            subitem: subitem,
            id: id,
            name: name,
        }
    });
    return;
}

// MANAGER

// Get item id, route: '/latestitemid'
// Returns the most recent item id
export async function getLatestItemId() {
    let result = await instance.get('/latestitemid');
    return result.data.items[0].item_id;
}

// Get inventory id, route: '/latestid'
// Returns the most recent item id
export async function getLatestInventoryId() {
    let result = await instance.get('/latestid');
    return result.data.items[0].id;
}

// Get sales report, '/getsalesreport'
// Returns array of objects
export async function getSalesReport(from, to) {
    let result = await instance.get('/getsalesreport',{
        params: {
            from: from,
            to: to,
        }
    });
    return result.data.items;
}

// Get restock report, '/getrestockreport'
// Returns array of objects
export async function getRestockReport(from, to) {
    let result = await instance.get('/getrestockreport',{
        params: {
            from: from,
            to: to,
        }
    });
    return result.data.items;
}

// Get excess report, '/getexcessreport'
// Returns array of objects
export async function getExcessReport(from, to) {
    let result = await instance.get('/getexcessreport',{
        params: {
            from: from,
            to: to,
        }
    });
    return result.data.items;
}

// Get pairs together, '/getpairstogether'
// Returns array of objects
export async function getPairsTogether() {
    let result = await instance.get('/getpairstogether');
    return result.data.items;
}

// Get inventory, '/inventory'
// Returns array of objects
export async function getInventory() {
    let result = await instance.get('/inventory');
    return result.data.items;
}

// Update inventory, '/updateinventory/:name/:itemid'
// Updates inventory table
export async function updateItemInventory(name, itemid) {
    let result = await instance.get('/updateinventory',{
        params: {
            name: name,
            itemid: itemid,
        }
    });
    return;
}

// Update items, '/updateitem/:name/:price/itemid'
// Updates items table
export async function updateItemItems(name, price, itemid) {
    let result = await instance.get('/updateitem',{
        params: {
            name: name,
            price: price,
            itemid: itemid,
        }
    });
    return;
}

// Add items, '/additem/:itemid/:name/:category/:price/:calories'
// Adds to items table
export async function addItem(itemid, name, category, price, calories) {
    let result = await instance.get('/additem',{
        params: {
            itemid: itemid,
            name: name,
            category: category,
            price: price,
            calories: calories,
        }
    });
    return;
}

// Add inventory, '/addinventory/:id/:itemid/:name/:quantity:/num_sold/:vendor/:purchase_price/:batch_quantity'
// Adds to inventory table
export async function addInventory(id, itemid, name, quantity, num_sold, vendor, purchase_price, batch_quantity) {
    let result = await instance.get('/addinventory',{
        params: {
            id: id,
            itemid: itemid,
            name: name,
            quantity: quantity,
            num_sold: num_sold,
            vendor: vendor,
            purchase_price: purchase_price,
            batch_quantity: batch_quantity,
        }
    });
    return;
}

// Delete item  '/deleteitem/:itemid'
// Deletes from items table
export async function deleteItem(itemid) {
    let result = await instance.get('/deleteitem',{
        params: {
            itemid: itemid,
        }
    });
    return;
}

// Delete inventory '/deleteinventory/:itemid'
// Deletes from inventory table
export async function deleteItemInventory(itemid) {
    let result = await instance.get('/deleteinventory',{
        params: {
            itemid: itemid,
        }
    });
    return;
}

// RESTOCK/EXCESS

// Count item, '/countitem/:from/:to/:itemuuid'
// Returns count of item in order_items
export async function countItem(from, to, itemid) {
    let result = await instance.get('/countitem',{
        params: {
            from: from,
            to: to,
            itemuuid: itemid,
        }
    });
    return result.data.items[0].count;
}

// Count topping, '/counttopping/:from/:to/:topping'
// Returns count of topping in order_toppings
export async function countTopping(from, to, id) {
    let result = await instance.get('/counttopping',{
        params: {
            from: from,
            to: to,
            topping: id,
        }
    });
    return result.data.items[0].count;
}

// SALES/SALES TOGETHER

// Get mainEntrees, '/getmainentrees'
// Returns array of JSON objects
export async function getMainEntrees() {
    let result = await instance.get('/getmainentrees');
    return result.data.items;
}

// Get all items, '/getitems'
// Returns an array of item JSON objects
export async function getItems() {
    let result = await instance.get('/getitems');
    return result.data.items;
}

// Get toppings
// Returns array of topping JSON objects
export async function getToppings() {
    let result = await instance.get('/toppings');
    return result.data.items;
}

// Get order item between dates, '/getorderitemdate/:from/:to/:entreename'
// Returns count of entree
export async function getOrderItemDate(from, to, entreename) {
    let result = await instance.get('/getorderitemdate',{
        params: {
            from: from,
            to: to,
            entreename: entreename,
        }
    });
    return result.data.items[0].count;
}

// Get order topping between dates, '/getordertoppingdate/:from/:to/:toppingname'
// Returns count of topping
export async function getOrderToppingDate(from, to, toppingname) {
    let result = await instance.get('/getordertoppingdate',{
        params: {
            from: from,
            to: to,
            toppingname: toppingname,
        }
    });
    return result.data.items[0].count;
}

// Get bigboy count, '/bigboycount/:from/:to/:entreename/:toppingname'
// Returns count of entree and topping pairs
export async function getBigBoyCount(from, to, entreename, toppingname) {
    let result = await instance.get('/bigboycount',{
        params: {
            from: from,
            to: to,
            entreename: entreename,
            toppingname: toppingname,
        }
    });
    return result.data.items[0].count;
}

// Get bigboy, '/bigboy/:from/:to'
// Returns all entree and topping pairs
// Returns BIIG array of JSON objects
export async function getBigBoy(from, to) {
    let result = await instance.get('/bigboy',{
        params: {
            from: from,
            to: to,
        }
    });
    return result.data.items;
}

// CONNECTOR

// Get item from category, '/getcategory/:category'
// Returns array of JSON objects
export async function getItemsFromCategory(category) {
    let result = await instance.get('/getcategory',{
        params: {
            category: category,
        }
    });
    return result.data.items;
}

// Get prices, '/getprice'
// Returns array of JSON objects
export async function getPrices() {
    let result = await instance.get('/getprice');
    return result.data.items;
}

