const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  commentProduct,
  deleteProductComment,
  rateProduct,
} = require("../../controllers/product");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const { validator, productRules } = require("../../middlewares/bodyValidator");

// @route GET api/product
// @description get all products
// @access PUBLIC

router.get("/", getProducts);

// @route POST api/product
// @description create product
// @access PRIVATE

router.post("/", auth, isAdmin, productRules(), validator, createProduct);

// @route POST api/product/productID
// @description update product by id
// @access PRIVATE

router.post(
  "/:productID",
  auth,
  isAdmin,
  productRules(),
  validator,
  updateProduct
);

// @route DELETE api/product/:productID
// @description delete product
// @access PRIVATE

router.delete("/:productID", auth, isAdmin, deleteProduct);

// @route POST api/product/comment/:productID
// @description comment product
// @access PRIVATE

router.post("/comment/:productID", auth, commentProduct);

// @route DELETE api/product/comment/:productID/:commentID
// @description delete comment
// @access PRIVATE

router.delete("/comment/:productID/:commentID", auth, deleteProductComment);

// @route POST api/product/rate/:productID
// @description rate product
// @access PRIVATE

router.post("/rate/:productID", auth, rateProduct);

module.exports = router;
