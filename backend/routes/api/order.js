const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");

const {
  getAllOrders,
  getOrdersByUserID,
  createOrder,
  updateOrderByID,
  deleteOrder,
} = require("../../controllers/order");

// @route GET api/order
// @description get all orders
// @access PRIVATE

router.get("/", auth, isAdmin, getAllOrders);

// @route GET api/order/:userID
// @description get user orders
// @access PRIVATE

router.get("/:userID", auth, getOrdersByUserID);

// @route POST api/order
// @description create order
// @access PRIVATE

router.post("/", auth, createOrder);

// @route PUT api/order/:orderID
// @description update order
// @access PRIVATE

router.put("/:orderID", auth, updateOrderByID);

// @route DELETE api/order/:orderID
// @description delete order by id
// @access PRIVATE

router.delete("/:orderID", auth, deleteOrder);

module.exports = router;
