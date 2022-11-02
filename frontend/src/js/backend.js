import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
});

async function getItems() {
    let items = await instance.get('/items');
    return items.data.items;
}

// SERVER
//
// Get orderid, route: '/orderid'
//
// Get topping uuid, route: '/toppinguuid'
//
// Get item uuid, route: '/itemuuid'
//
// Get item quantity: route'/quantity:id'
//
// Get id from name: route'/itemid:name'
//
// Insert order table, route'/createorder:orderID/:calories/:total/:tip_double/:total_after_tip/:after_tip/:date
//
// Update inventory after order, route: '/updateinventoryserver:itemid'
//
// Insert into order items, route: '/insertitem:uuid/:orderid/:subitem/:id/:name'
//
// Insert into order toppings, route: '/inserttopping:uuid/:orderid/:subitem/:id/:name'
//
// MANAGER
//
// Get inventory, '/inventory'
//
// Update inventory, '/updateinventory/:name/:itemid'
//
// Update items, '/updateitem/:name/:price/itemid'
//
// Add items, '/additem/:itemid/:name/:category/:price/:calories'
//
// Add inventory, '/addinventory/:itemid/:name/:quantity:/num_sold/:vendor/:purcahse_price/:batch_quantity'
//
// Delete item  '/deleteitem/:itemid'
//
// Delete inventory '/deleteinventory/:itemid'
//
// RESTOCK/EXCESS
//
// Count item, '/countttem/:itemuuid'
//
// Count topping, '/counttopping/:topping'
//
// SALES/SALES TOGETHER
//
// Get allItems, '/getitems'
//
// Get mainEntrees, '/getmainentrees'
//
// Get order item between dates, '/getorderitemdate/:from/:to'
//
// Get order topping between dats, '/getordertoppingdate/:from/:to'
//
// Get bigboy count, '/bigboycount/:from/:to/:entreename/:toppingname'
//
// Get bigboy, '/bigboy/:from/:to'
//
// CONNECTOR
//
// Get item from category, '/getitems/:category'
//
// Get prices, '/getprice'

export { getItems };
