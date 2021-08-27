const mongoose = require("mongoose");

const salesSchema = {
  block: Number,
  krishibhavan: String,
  cc_id: String,
  category: String,
  items: [
    {
      name: String,
      malayalam: String,
      qty_sold: Number,
      sales_rate: Number,
      sales_total: Number,
    },
  ],
};

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;
