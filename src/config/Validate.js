const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const validate = (data) => {
  const schema = joi.object({
    username: joi.string().required().label("username"),
    email: joi.string().email().label("email"),
    fullname: joi.string().required().label("fullname"),
    img: joi.string().required().min(20),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};
module.exports = validate;
