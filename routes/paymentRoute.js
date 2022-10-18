const router = require("express").Router();
const { UserAuthenticate } = require("../middlewares/UserAuth");
const {
  handlePaymentInitialization,
  handlePaymentRedirect,
} = require("../controllers/paymentController");

router.post("/", UserAuthenticate, handlePaymentInitialization);

router.get("/redirect", handlePaymentRedirect);

module.exports = router;
