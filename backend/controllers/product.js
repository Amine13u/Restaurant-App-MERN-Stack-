const Product = require("../models/Product");
const User = require("../models/User");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      res.status(404).send({ msg: "Oops, there is no products available" });
    }

    res.send(products);
  } catch (error) {
    console.error(error.message);
  }
};

const createOrUpdateProduct = async (req, res) => {
  const { name, price, comment, rate } = req.body;
  const productFields = {};

  if (name) productFields.name = name;
  if (price) productFields.price = price;
  if (comment) productFields.comment = comment;
  if (rate) productFields.rate = rate;

  try {
    let product = await Product.findOne({ name });

    if (product) {
      product = await Product.findOneAndUpdate(
        { name },
        { $set: productFields },
        { new: true }
      );
      return res.json(product);
    }

    product = new Product(productFields);
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndRemove({ _id: req.params.productID });
    res.send({ msg: "Product deleted " });
  } catch (error) {
    console.error(error.message);
  }
};

const commentProduct = async (req, res) => {
  const { text } = req.body;
  try {
    const product = await Product.findById({ _id: req.params.productID });

    const newComment = { user: req.user.id, text };

    product.comment.unshift(newComment);

    await product.save();
    res.send(product.comment);
  } catch (error) {
    console.error(error.message);
  }
};

const deleteProductComment = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.productID });
    const comment = product.comment.find(
      (elt) => elt.id === req.params.commentID
    );

    if (!comment) {
      return res.status(404).json([{ msg: "Comment does not exists" }]);
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    product.comment = product.comment.filter(
      (comment) => comment._id.toString() !== req.params.commentID
    );

    await product.save();

    res.json(product.comment);
  } catch (error) {
    console.error(error.message);
  }
};

const rateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productID);

    // //Check if the post has already been rated
    // if (product.rate.find((rate) => rate.user.toString() === req.user.id)) {
    //   return res.status(400).json([{ msg: "Cannot rate more than one time" }]);
    // }

    const rate = {
      user: req.user.id,
      value: req.body.value,
    };

    product.rate.unshift(rate);

    await product.save();

    res.send(product.rate);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json([{ msg: "Post not found " }]);
    }

    res.status(500).send([{ msg: "Server Error !" }]);
  }
};

module.exports = {
  getProducts,
  createOrUpdateProduct,
  deleteProduct,
  commentProduct,
  deleteProductComment,
  rateProduct,
};
