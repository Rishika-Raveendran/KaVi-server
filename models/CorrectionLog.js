const mongoose = require("mongoose");

const correctionLogSchema = {
    cc_id: String,
    detail: [{
        date: Date,
        logs:{
     
        category: String,
        correction: Number,
        remarks: String
    }}]
 
};

const CorrectionLog = mongoose.model("CorrectionLog", correctionLogSchema);
module.exports = CorrectionLog;
