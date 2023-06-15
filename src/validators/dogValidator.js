const { check, validationResult } = require("express-validator");

const validateCreateDog = [
  check("name").notEmpty().withMessage("Name is required!"),
  check("color").notEmpty().withMessage("Color is required!"),
  check("tail_length")
    .isFloat({ min: 0 })
    .withMessage("Tail length must be a positive number"),
  check("weight")
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(500)
        .json({ errors: errors.array().map((error) => error.msg) });
    }
    next();
  },
];

module.exports = { validateCreateDog };
