const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const paymentRoute = require("./routes/paymentRoute");

dotenv.config();

const fileUpload = require("express-fileupload");
const { application } = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// express middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024, //2mb
    },
  })
);

app.use(express.static("public"));

//admin routes
app.use("/api/admin/auth", adminRoute);

// product routes
app.use("/api/products", productRoute);

//category routes
app.use("/api/category", categoryRoute);

//user routes
app.use("/api/user", userRoute);

//cart route
app.use("/api/cart", cartRoute);

//cart route
app.use("/api/payment", paymentRoute);
// back end set up
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
);

//default route
app.get("/", (req, res) => {
  res.send("<h3> Api running...</h3>");
});
