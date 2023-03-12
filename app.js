const express = require('express');
const app = express();
app.use(express.static('client'));
app.use(express.json());

const item = require('./item.json');
const orders = require('./orders.json');

app.get('/item', function (req, resp) {
  resp.json(item);
});

app.get('/orders', function (req, resp) {
  resp.json(orders);
});

app.post('/postitem', (req, resp) => {
  const newItem = req.body;
  item.push(newItem);
  resp.json(item);
});

app.post('/postorder', (req, resp) => {
  const order = req.body;
  order.orderId = orders.length;
  orders.push(order);
  resp.json(orders);
});

module.exports = app;
