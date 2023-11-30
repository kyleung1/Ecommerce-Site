const express = require("express");
const userRoutes = require("./routes/user.js");
const itemRoutes = require("./routes/items.js");
const itemRoutes2 = require("./routes/items2.js");
const checkoutRoutes = require("./routes/checkoutRoutes.js");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
//app.use(setUser)

//routes
app.get("/admin", (req, res) => {
  res.send("admin page");
});

app.use("/user", userRoutes);

app.use("/item", itemRoutes);

app.use("/item2", itemRoutes2);

app.use("/create-checkout-session", checkoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db and server started on port",
        process.env.PORT
      );
    }); //server is 3001
  })
  .catch((error) => {
    console.log(error);
  });

// app.use((req, res, next) => {
//   req.on("data", (chunk) => {
//     console.log(JSON.parse(chunk));
//   });
//   next();
// });

//references

// app.get('/api', (req, res) => {
//     //res.render('index')
//     res.json({"message": ["hello from server", "hi"]});
// });

//set user middleware
// function setUser(req,res,next) {
//     const userId = req.body.userId
//     if (userId) {
//         req.user = User.find({})(user => user.id === userId) // this line change to mongoose
//     }
//     next()
// }
