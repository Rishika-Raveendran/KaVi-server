const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
//const cron = require("node-cron");
var router = require("./routes/reportRoutes");
// var Cstocklog = require("./models/CentreReport");
// var User = require("./models/User");
// const Collection = require("./models/Collection");
// const Sales = require("./models/Sales");
// const Stock = require("./models/Stock");

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT)||3001;

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

// cron.schedule("59 11 * * *", function () {
//   var users = [];
//   User.find({})
//     .then((res) => {
//       users = res;
//     })
//     .then((res) => {
//       setTimeout(()=> handleStockUpdate(users),2000)
//       //handleStockUpdate(users)
//     })
//     .catch((err) => console.log(err));
// });

// const handleStockUpdate = (users) => {
//   let coll = [], sales = [],stock=[];
//   let lcoll =[], lsales =[];
//   let ocoll =[], osales =[];
//   let gcoll =[], gsales =[];
//   let category=['local','organic','gpa']
  // let lstock = {}, gstock = {}, ostock = {};
  
  
  // for (let i = 0; i < users.length; ++i){
  //   for (let j = 0; j < 3; ++j){
  //     let newStock = [];
  //     //Fetching collection day
  //     Collection.findOne({ cc_id: users[i].cc_id, category: category[j] })
  //       .then((res) => {
  //         console.log(`${category[j]} collection is working`)
  //         coll = res.items;
  //       }).catch(err => console.log(
  //         `Collection fetching error : ${err}`));
  //     //Fetching sales of the particular day
  //       Sales.findOne({ cc_id: users[i].cc_id, category:category[j] })
  //         .then((res) => {
            
  //         console.log(`${category[j]} sales is working`)
  //         sales = res.items
  //         }).catch(err => console.log(`Sales fetching error : ${err}`));
      
  //     //Fetching stock till the previous day
  //     Stock.findOne({ cc_id: users[i].cc_id, category:category[j] })
  //       .then((doc) => {
          
  //         console.log(`${category[j]} stock is working`)
  //         stock = doc.item_stock
  //       }).catch(err => console.log(`Stock fetching error : ${err}`));
      
  //     //Waiting for the fetch to complete
  //     while (coll.length === 0 || sales.length === 0 || stock.length === 0) {
  //       setTimeout(() => {
  //         console.log("Waiting for fetch to complete")
  //       }, 3000);
  //     }
  
      //We have to store the local,gpa and organic values separately to calculate the overall stock value
      // if (j === 0) {
      //   lcoll = coll;
      //   lsales = sales;
      // }

      
//     }
//   }

// }


//require route
app.use("/", router);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Contorl-Allow-Methods', 'Content-Type', 'Authorization');
  next();
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}

app.listen(PORT, function () {
  console.log("Server is listening");
});
