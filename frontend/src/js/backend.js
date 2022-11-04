import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
});

// SERVER

// Get orderid, route: '/orderid'
export async function getLatestOrderId() {
    let result = await instance.get('/orderid');
    return result.data;
}

// Get topping uuid, route: '/toppinguuid'
export async function getLatestToppingUUID() {
    let result = await instance.get('/toppinguuid');
    return result.data;
}

// Get item uuid, route: '/itemuuid'
export async function getLatestItemUUID() {
    let result = await instance.get('/itemuuid');
    return result.data;
}

// Get item quantity: route'/quantity:id'
export async function getQuantityById(itemid) {
    let result = await instance.get('/quantity',{id: itemid});
    return result.data;
}

// Get id from name: route'/itemid:name'
export async function getIdFromName(name) {
    let result = await instance.get('/itemid',{name: name});
    return result.data;
}

// Insert order table, route'/createorder:orderID/:calories/:total/:tip/:total_after_tip/:date'
export async function insertOrder(orderid, cals, total, tip, total_after_tip, date) {
    let result = await instance.get('/createOrder',{
        orderID: orderid,
        calories: cals,
        total: total,
        tip: tip,
        total_after_tip: total_after_tip,
        date: date,
    });
    return result.data;
}

// Update inventory after order, route: '/updateinventoryserver:itemid'
export async function incrementInventory(itemid) {
    let result = await instance.get('/updateinventoryserver',{itemid: itemid});
    return result.data;
}

// Insert into order items, route: '/insertitem:uuid/:orderid/:subitem/:id/:name'
export async function insertOrderItems(uuid, orderid, subitem, id, name) {
    let result = await instance.get('/insertitem',{
        uuid: uuid,
        orderid: orderid,
        subitem: subitem,
        id: id,
        name: name,
    });
    return result.data;
}

// Insert into order toppings, route: '/inserttopping:uuid/:orderid/:subitem/:id/:name'
export async function insertOrderToppings(uuid, orderid, subitem, id, name) {
    let result = await instance.get('/inserttopping',{
        uuid: uuid,
        orderid: orderid,
        subitem: subitem,
        id: id,
        name: name,
    });
    return result.data;
}

// MANAGER

// Get inventory, '/inventory'
export async function getInventory() {
    let result = await instance.get('/inventory');
    return result.data;
}

// Update inventory, '/updateinventory/:name/:itemid'
export async function updateItemInventory(name, itemid) {
    let result = await instance.get('/updateinventory',{
        name: name,
        itemid: itemid,
    });
    return result.data;
}

// Update items, '/updateitem/:name/:price/itemid'
export async function updateItemItems(name, price, itemid) {
    let result = await instance.get('/updateitem',{
        name: name,
        price: price,
        itemid: itemid,
    });
    return result.data;
}

// Add items, '/additem/:itemid/:name/:category/:price/:calories'
export async function addItem(itemid, name, category, price, calories) {
    let result = await instance.get('/additem',{
        itemid: itemid,
        name: name,
        category: category,
        price: price,
        calories: calories,
    });
    return result.data;
}

// Add inventory, '/addinventory/:id/:itemid/:name/:quantity:/num_sold/:vendor/:purchase_price/:batch_quantity'
export async function addInventory(id, itemid, name, quantity, num_sold, vendor, purchase_price, batch_quantity) {
    let result = await instance.get('/addinventory',{
        id: id,
        itemid: itemid,
        name: name,
        quantity: quantity,
        num_sold: num_sold,
        vendor: vendor,
        purchase_price: purchase_price,
        batch_quantity: batch_quantity,
    });
    return result.data;
}

// Delete item  '/deleteitem/:itemid'
export async function deleteItem(itemid) {
    let result = await instance.get('/deleteitem',{
        itemid: itemid,
    });
    return result.data;
}

// Delete inventory '/deleteinventory/:itemid'
export async function deleteItemInventory(itemid) {
    let result = await instance.get('/deleteinventory',{
        itemid: itemid,
    });
    return result.data;
}

// RESTOCK/EXCESS

// Count item, '/countitem/:from/:to/:itemuuid'
export async function countItem(itemuuid) {
    let result = await instance.get('/countitem',{
        from: from,
        to: to,
        itemuuid: itemuuid,
    });
    return result.data;
}

// Count topping, '/counttopping/:from/:to/:topping'
export async function countTopping(topping) {
    let result = await instance.get('/counttopping',{
        from: from,
        to: to,
        topping: topping,
    });
    return result.data;
}

// SALES/SALES TOGETHER

// Get mainEntrees, '/getmainentrees'
export async function getMainEntrees() {
    let result = await instance.get('/getmainentrees');
    return result.data;
}

// Get all items, '/getitems'
export async function getItems() {
    let result = await instance.get('/getitems');
    return result.data;
}

// Get toppings
export async function getToppings() {
    let result = await instance.get('/toppings');
    return result.data;
}

// Get order item between dates, '/getorderitemdate/:from/:to'
export async function getOrderItemDate(from, to) {
    let result = await instance.get('/getorderitemdate',{
        from: from,
        to: to,
    });
    return result.data;
}

// Get order topping between dats, '/getordertoppingdate/:from/:to'
export async function getOrderToppingDate(from, to) {
    let result = await instance.get('/getordertoppingdate',{
        from: from,
        to: to,
    });
    return result.data;
}

// Get bigboy count, '/bigboycount/:from/:to/:entreename/:toppingname'
export async function getBigBoyCount(from, to, entreename, toppingname) {
    let result = await instance.get('/bigboycount',{
        from: from,
        to: to,
        entreename: entreename,
        toppingname: toppingname,
    });
    return result.data;
}

// Get bigboy, '/bigboy/:from/:to'
export async function getBigBoy(from, to) {
    let result = await instance.get('/bigboy',{
        from: from,
        to: to,
    });
    return result.data;
}

// CONNECTOR

// Get item from category, '/getcategory/:category'
export async function getItemsFromCategory(category) {
    let result = await instance.get('/getcategory',{
        category: category,
    });
    return result.data;
}

// Get prices, '/getprice'
export async function getPrices() {
    let result = await instance.get('/getprice');
    return result.data;
}

