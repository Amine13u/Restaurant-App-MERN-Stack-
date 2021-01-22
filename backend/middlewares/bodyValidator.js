const { body, validationResult } = require("express-validator");

const registerRules = () => [
  body("firstName", "firstName is required").isLength({ min: 3, max: 35 }),
  body("lastName", "lastName is required").isLength({ min: 3, max: 35 }),
  body("email", "email is not valid").isEmail(),
  body("password", "password must be at least 6 characters length").isLength({
    min: 6,
    max: 35,
  }),
];

const loginRules = () => [
  body("email", "email is not valid").isEmail(),
  body("password", "password must be at least 6 characters length").isLength({
    min: 6,
    max: 35,
  }),
];

const addressrules = () => [
  body("address_1", "address_1 is required").notEmpty(),
];

const productRules = () => [
  body("name", "name is required").notEmpty(),
  body("price", "price is required").notEmpty(),
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(handleErrors(errors.array()));
  } else next();
};

const handleErrors = (errorsArray) =>
  errorsArray.map((error) => ({ msg: error.msg }));

module.exports = {
  validator,
  loginRules,
  registerRules,
  addressrules,
  productRules,
};
