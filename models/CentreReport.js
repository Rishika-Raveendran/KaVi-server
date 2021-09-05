const mongoose = require("mongoose");

const cstockSchema = { 
  block: Number,
  krishibhavan: String,
  cc_id: String,
  category: String,
  items: [
    {
      name: String,
      malayalam: String,
      qty_recieved: Number,
      purchase_rate: Number,
      purchase_total: Number,
      farmers: Number,
      extra_qty: Number,
    },
  ],
};

const Cstock = mongoose.model("Cstock", cstockSchema);
module.exports = Cstock;
