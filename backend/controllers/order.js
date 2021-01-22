const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      res.status(404).send([{ msg: "Oops, there is no orders available" }]);
    }

    res.send(orders);
  } catch (error) {
    console.error(error);
  }
};

const getOrdersByUserID = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userID });

    if (orders.length === 0) {
      res.status(404).send([{ msg: "Oops, there is no orders available" }]);
    }

    res.send(orders);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json([{ msg: "Oops, there is no orders available" }]);
    }
    console.error(error.message);
  }
};

const createOrder = async (req, res) => {
  const { products, totalPrice } = req.body;
  const orderFields = {};
  orderFields.user = req.user.id;

  if (products) orderFields.products = products;
  if (totalPrice) orderFields.totalPrice = totalPrice;

  try {
    order = new Order(orderFields);
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.params.orderID });

    if (!order) {
      return res.status(404).json([{ msg: "Order does not exists" }]);
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    await order.remove();

    res.send({ msg: "Order deleted" });
  } catch (error) {
    console.error(error);
  }
};

const updateOrderByID = async (req, res) => {
  const { products, totalPrice } = req.body;
  try {
    let order = await Order.findOneAndUpdate(
      { _id: req.params.orderID },
      { $set: { products, totalPrice } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json([{ msg: "Order does not exists" }]);
    }

    res.json(order);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUserID,
  createOrder,
  updateOrderByID,
  deleteOrder,
};
