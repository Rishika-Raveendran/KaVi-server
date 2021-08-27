const mongoose = require("mongoose");

const collectionSchema = { 
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

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
