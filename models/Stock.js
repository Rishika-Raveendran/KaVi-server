//Model for the current stock data
const mongoose = require("mongoose");

const stockSchema = {
  cc_id: String,
  category: String,
  item_stock: [
    {
      name: String,
      stock: Number,
    }
  ],
};
const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
