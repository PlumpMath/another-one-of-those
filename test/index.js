var expect    = require("chai").expect;
var api = require("../index");

describe("the API", function() {
  describe("the cart", function() {
    it("should calc an empty cart", function() {
      expect(api.cart([])).to.equal(0);
    });
    it("should calc a basic cart", function() {
      expect(api.cart(["Apple", "Apple", "Orange", "Apple"])).to.equal(105);
    });
    it("should calc a cart with unknown items", function() {
      expect(api.cart(["Pears"])).to.equal(0);
    });
    it("should calc a cart with known and unknown items", function() {
      expect(api.cart(["Pears", "Apple", "Apple", "Orange", "Apple"])).to.equal(105);
    });
  });

  describe("promotions", function() {
    it("should calc a promo with no effected promotion", function() {
      expect(api.cartPromos(["Apple", "Apple", "Orange", "Apple", "Papaya", "Papaya"])).to.equal(205);
    });
    it("should calc a promo with one effected promotion", function() {
      expect(api.cartPromos(["Apple", "Apple", "Orange", "Apple", "Papaya", "Papaya", "Papaya"])).to.equal(205);
    });
  });

  describe("receipts", function() {
    it("should print a receipt without promotions", function() {
      var expected =
      "Apple (3 X 25p): 75p\n" +
      "Orange (1 X 30p): 30p\n" +
      "Papaya (2 X 50p): 100p\n" +
      "Total: 205p";
      expect(api.receipt(["Apple", "Apple", "Orange", "Apple", "Papaya", "Papaya"])).to.equal(expected);
    });
    it("should print a receipt with promotions", function() {
      var expected =
      "Apple (3 X 25p): 75p\n" +
      "Orange (1 X 30p): 30p\n" +
      "Papaya (2 X 50p and 1 FREE!): 100p\n" +
      "Total: 205p";
      expect(api.receipt(["Apple", "Apple", "Orange", "Apple", "Papaya", "Papaya", "Papaya"])).to.equal(expected);
    });
  });

});
