var _ = require("lodash");

var catalogue = {
  "Apple": 25,
  "Orange": 30,
  "Garlic": 15,
  "Papaya": 50
};

// papayas: pay for every 1 and a half-eth item
// everything else: pay for every item
var promos = {
  "Papaya": 1.5,
};

// basic cart sum without taking promos into account
var cart = function (items) {
  return _(items).map(i => catalogue[i] || 0).sum();
};

// count how many item of items one actually pays for based on promotions
var paidFor = function (items, item) {
  return Math.ceil(items.length / (promos[item] || 1));
};

// calculates the sum of a promotioned cart
var cartPromos = function (items) {
  return _(items)
  .groupBy()
  .map((items, item) => paidFor(items, item) * catalogue[item]).sum();
};

var receipt = function (items) {
  var itemised = _(items)
  .groupBy()
  .map((items, item) => {
    var paid = paidFor(items, item);
    var freeText = paid == items.length ? "" : " and " + (items.length - paid) + " FREE!";
    var out = item + " (" + paid + " X " + catalogue[item] + "p" +
      freeText + "): " + (paid * catalogue[item]) + "p";
    return out;
  }).value();
  return itemised.join('\n') + "\nTotal: " + cartPromos(items) + "p";
};

var api = {
  cart: cart,
  cartPromos: cartPromos,
  receipt: receipt
};

module.exports = api;
