// const axios = require("axios");
const axios = require("axios");
const https = require("https");
const Cart = require("../models/Cart");
const BASE_URL = "https//api.paystack.co";

const API =
  process.env.PAYSTACK_KEY ||
  "sk_test_8d4238217eb6b8f7d4244d2dfa7bb106a5d49914";

const handlePaymentInitialization = async (req, res) => {
  try {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: "Bearer " + API,
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email: req.user?.email,
      amount: req.body.amount,
      callback_url: `http://localhost:7000/api/payment/redirect?user=${req.user._id}`,
    });
    let data = "";

    const _request = https
      .request(options, (response) => {
        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          console.log(JSON.parse(data));
          res.send(data);
        });
      })
      .on("error", (error) => {
        console.error(error);
      });

    _request.write(body);
    _request.end();
  } catch (err) {
    console.log("Error => ", err.message);
  }
};

const handleGetPayment = async (reference) => {
  // const options = {
  //   hostname: "api.paystack.co",
  //   port: 443,
  //   path: "/transaction/verify/" + reference,
  //   method: "GET",
  //   headers: {
  //     Authorization: "Bearer " + API,
  //   },
  // };

  // https
  //   .request(options, (res) => {
  //     let data = "";

  //     res.on("data", (chunk) => {
  //       data += chunk;
  //     });

  //     res.on("end", () => {
  //       return JSON.parse(data);
  //     });
  //   })
  //   .on("error", (error) => {
  //     console.error(error);
  //     return false;
  //   });

  const { data } = await axios.get(
    "https://api.paystack.co/transaction/verify/" + reference,
    {
      headers: {
        Authorization: "Bearer " + API,
      },
    }
  );

  return data;
};

const handlePaymentRedirect = async (req, res) => {
  // res.send({ query: req.query });
  // res.send("Hi");
  try {
    const { user, reference } = req.query;
    if (!user) throw new Error("user is undefined");

    // Check if payment is successful
    const result = await handleGetPayment(reference);
    if (result.status) {
      await Cart.deleteMany({ user });
      res.redirect("http://localhost:3000/success");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("http://localhost:3000/error?msg=" + error.message);
  }
};

module.exports = {
  handlePaymentInitialization,
  handlePaymentRedirect,
};
