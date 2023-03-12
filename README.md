# Web Gallery of Art
Web Gallery of Art is an e-commerce gallery website that allows users to view and purchase various artworks. The website is built using HTML, CSS, and JavaScript.

## How to open
### Go to the directory of the file with shell / terminal
- In the shell / terminal
```bash
 npm install
```
```bash
 npm start
```
-  Open browser
```bash
 http://127.0.0.1:8090/summative.html
```

## Features
#### The e-commerce gallery website has the following features:
- Product Pages: Each product page displays information about a specific artwork, including its title, artist, description, and price. Users can also add the artwork to their shopping cart from the product page.

- Shopping Cart: The shopping cart allows users to view the items they have added to their cart and adjust the quantity of each item.The checkout button allow users to complete their purchase.

- Admin Page: The admin page allows the website administrator to manage the website, view orders that have been submitted, and add new products to the website.

## Run JEST
### Go to the directory of the file with shell / terminal
- In the shell / terminal

```bash
 npm test
```

# API Documentation

The REST API to the Web Gallery of Art is described below.

## Get list of items
    http://127.0.0.1:8090/item
Allow to get object array of information about artworks, including its item ID, title, artist, description, price, and the directory of the image source.

### Request

`GET /item/`

    curl --location 'http://127.0.0.1:8090/item'

### Response

    [
    {
        "itemID": 0,
        "name": "portrait of emperor rudolf ii",
        "artist": "AACHEN, Hans von",
        "price": 14,
        "src": "image/rudolf2.jpeg"
    },
    {
        "itemID": 1,
        "name": "portrait of josef heintz",
        "artist": "AACHEN, Hans von",
        "price": 35,
        "src": "image/portrai2.jpeg"
    },
    {
        "itemID": 2,
        "name": "anna of tyrol",
        "artist": "AACHEN, Hans von",
        "price": 20,
        "src": "image/portrai3.jpeg"
    },
    {
        "itemID": 3,
        "name": "a prince of saxony",
        "artist": "CRANACH, Lucas the Elder",
        "price": 10,
        "src": "image/01princ1.jpeg"
    },
    {
        "itemID": 4,
        "name": "portrait of a jurist",
        "artist": "CRANACH, Lucas the Elder",
        "price": 10,
        "src": "image/03juris1.jpeg"
    },
    {
        "itemID": 5,
        "name": "a princess of saxony",
        "artist": "CRANACH, Lucas the Elder",
        "price": 10,
        "src": "image/01princ2.jpeg"
    },
    {
        "itemID": 6,
        "name": "no. 48 the seven vices: envy",
        "artist": "GIOTTO di Bondone",
        "price": 10,
        "src": "image/virtu_2.jpeg"
    },
    {
        "itemID": 7,
        "name": "no. 50 the seven vices: injustice",
        "artist": "GIOTTO di Bondone",
        "price": 10,
        "src": "image/vice_4.jpeg"
    },
    {
        "itemID": 8,
        "name": "no. 53 the seven vices: foolishness",
        "artist": "GIOTTO di Bondone",
        "price": 10,
        "src": "image/vice_7.jpeg"
    },
    {
        "itemID": 9,
        "name": "still-life with fruit and crystal vase",
        "artist": "RAELST, Willem van",
        "price": 10,
        "src": "image/still_fr.jpeg"
    },
    {
        "itemID": 10,
        "name": "still-life with fruit",
        "artist": "RAELST, Willem van",
        "price": 10,
        "src": "image/stillfru.jpeg"
    },
    {
        "itemID": 11,
        "name": "breakfast piece",
        "artist": "RAELST, Willem van",
        "price": 10,
        "src": "image/breakfas.jpeg"
    }
    ]

## Get list of orders
    http://127.0.0.1:8090/postitem
Allow to get object array of information about orders, including its order ID, total price, and the purchases array, which contains purchase ID and item ID.

### Request

`GET /item/`

    curl --location 'http://127.0.0.1:8090/orders'

### Response

    [
    {
        "total": 49,
        "purchases": [
            {
                "purchaseId": 0,
                "itemID": "0"
            },
            {
                "purchaseId": 1,
                "itemID": "1"
            }
        ],
        "orderId": 0
    }
    ]

## Create item
    http://127.0.0.1:8090/postitem
Allow an item, which includes its item ID, title, artist, description, price, and the directory of the image source, to be added into the item list.
### Request

`POST /postitem/`

    curl --location 'http://127.0.0.1:8090/postitem' \
    --data '{
            "itemID": 12,
            "name": "The Starry Night",
            "artist": "Vincent van Gogh",
            "price": 99,
            "src": "image/newProduct.jpeg"
        }'

### Body

    {
    "itemID": 12,
    "name": "The Starry Night",
    "artist": "Vincent van Gogh",
    "price": 99,
    "src": "image/newProduct.jpeg"
    }
    
### Response

    [
    {
        "itemID": 0,
        "name": "portrait of emperor rudolf ii",
        "artist": "AACHEN, Hans von",
        "price": 14,
        "src": "image/rudolf2.jpeg"
    },
    {
        "itemID": 1,
        "name": "portrait of josef heintz",
        "artist": "AACHEN, Hans von",
        "price": 35,
        "src": "image/portrai2.jpeg"
    },
    {
        "itemID": 2,
        "name": "anna of tyrol",
        "artist": "AACHEN, Hans von",
        "price": 20,
        "src": "image/portrai3.jpeg"
    },
    {
        "itemID": 3,
        "name": "a prince of saxony",
        "artist": "CRANACH, Lucas the Elder",
        "price": 10,
        "src": "image/01princ1.jpeg"
    },
    {
        "itemID": 4,
        "name": "portrait of a jurist",
        "artist": "CRANACH, Lucas the Elder",
        "price": 10,
        "src": "image/03juris1.jpeg"
    },
    {
        "itemID": 5,
        "name": "a princess of saxony",
        "artist": "CRANACH, Lucas the Elder",
        "price": 10,
        "src": "image/01princ2.jpeg"
    },
    {
        "itemID": 6,
        "name": "no. 48 the seven vices: envy",
        "artist": "GIOTTO di Bondone",
        "price": 10,
        "src": "image/virtu_2.jpeg"
    },
    {
        "itemID": 7,
        "name": "no. 50 the seven vices: injustice",
        "artist": "GIOTTO di Bondone",
        "price": 10,
        "src": "image/vice_4.jpeg"
    },
    {
        "itemID": 8,
        "name": "no. 53 the seven vices: foolishness",
        "artist": "GIOTTO di Bondone",
        "price": 10,
        "src": "image/vice_7.jpeg"
    },
    {
        "itemID": 9,
        "name": "still-life with fruit and crystal vase",
        "artist": "RAELST, Willem van",
        "price": 10,
        "src": "image/still_fr.jpeg"
    },
    {
        "itemID": 10,
        "name": "still-life with fruit",
        "artist": "RAELST, Willem van",
        "price": 10,
        "src": "image/stillfru.jpeg"
    },
    {
        "itemID": 11,
        "name": "breakfast piece",
        "artist": "RAELST, Willem van",
        "price": 10,
        "src": "image/breakfas.jpeg"
    },
    {
        "itemID": 12,
        "name": "The Starry Night",
        "artist": "Vincent van Gogh",
        "price": 99,
        "src": "image/newProduct.jpeg"
    }
    ]

## Create order
    http://127.0.0.1:8090/postorder
Allow an order, which includes its order ID, total price, and the purchases array, which contains purchase ID and item ID, to be added into the orders list.

`POST /postorder/`

    curl --location 'http://127.0.0.1:8090/postorder' \
    --data '{
    "total": 49,
    "purchases": [{ "purchaseId": 0, "itemID": "0" }, { "purchaseId": 1, "itemID": "0" }]
    }'

### Body

    {
    "total": 49,
    "purchases": [{ "purchaseId": 0, "itemID": "0" }, { "purchaseId": 1, "itemID": "0" }]
    }
    
### Response

    [
    {
        "total": 49,
        "purchases": [
            {
                "purchaseId": 0,
                "itemID": "0"
            },
            {
                "purchaseId": 1,
                "itemID": "0"
            }
        ],
        "orderId": 0
    }
    ]