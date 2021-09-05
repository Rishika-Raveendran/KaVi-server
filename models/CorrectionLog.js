const mongoose = require("mongoose");

const correctionLogSchema = {
  cc_id: String,
  detail: [
    {
      date: Date,
      logs: [
          {
            name:String,
          correction: Number,
          remarks: String,
          category: String,
        },
      ],
    },
  ],
};

const CorrectionLog = mongoose.model("CorrectionLog", correctionLogSchema);
module.exports = CorrectionLog;
