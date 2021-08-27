const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
var router = require("./routes/reportRoutes");

//var auth = require("./middleware/auth")
app.use(cors());
app.use(express.json());



//connect
mongoose.connect(
  "mongodb+srv://vibgreen:vgr___01@cluster0.zqxxu.mongodb.net/KarshikaVipani?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "KarshikaVipani" },
  (err) => {
    if (err) {
      console.log("Failure");
    } else console.log("Success");
  }
);
app.get("/", (req, res) => {
  res.send("Hey there!");
});

//Scheduling database update at EOD
cron.schedule("* * * * *", function () {
 //Code to reset database everyday
  });

//require route
app.use("/", router);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('build'));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build','index.html'));
//   })
// }

app.listen(3001, function () {
  console.log("Server is listening");
});
