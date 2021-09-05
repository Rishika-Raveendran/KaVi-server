//Model for the current stock data
const mongoose = require("mongoose");

const stockSchema = {
  cc_id: String,
  item_stock: [
    {
      name: String,
      stock: Number,
    }
  ],
  category: String,
};
const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
