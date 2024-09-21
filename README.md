# Restaurant Page

https://liberatoaguilartamu.github.io/315_frontend/

## Description

This project is a point of sales system and website for Pom and Honey, a local restaurant. The customer-facing part of the site is a menu page, and the ordering of items is tied to the backend. The manager-facing side is an inventory view which shows the stocks of items and order history. The system consists of the following components:

- Frontend built using the VueJS framework and Vuetify components
  - Mobile-view supported
- Node.js server which makes queries to the database
  - Google OAuth login authentication
- PostgreSQL database storing the order history, inventory, tiem tables, and login information
- Accessibility features: colorblind mode, change font size, translate text
- Google Map API: show the route to the nearest Pom and Honey

## Demo Video

## Features

## Database Tables

The database holds the order history and inventory. Each order can have multiple items, and each item can have multiple toppings.

### Orders

Each entry represents a singular order and holds information specific to the entire order.

Fields: order_id, total_calories, subtotal_price, tip, total_price, datetime.

### Order_Items

Each entry represents the items that are part of an order.

Fields: UUID_PK, order_id_FK, order_subitem, entree_id_FK.

### Entree

Entrees are essentially the subclasses of items and are divided into gryo, bowl, soda, extras, etc.

Fields: UUID_PK, entree_name

### Order_Toppings

Each entry represents the toppings that are ordered with an item.

Fields: UUID_PK, order_id_FK, order_subitem_FK, topping_id_FK, topping_name.

### Inventory

Lists information on the items stocked by the store, including how to restock them.

Fields: id_PK, item_id, name, item_quantity, num_sold, vendor, purchase_price, batch_quantity.

## Run Locally

Run server

```
node index.js
```

Test server API

```
curl -X GET http://localhost:3000/<some path>
```

Compile and hot-reload for development

```
npm run serve
```

Build for production

```
npm run build
```
