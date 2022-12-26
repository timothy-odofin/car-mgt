const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = {
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
    phone: Joi.string().min(4).required(),
    category: Joi.string().min(4).required(),
    serviceList: Joi.string(),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  };
  return Joi.validate(data, schema);
};

const activeUserValidation = (data) => {
  const schema = {
    otp: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
  };
  return Joi.validate(data, schema);
};

const changePassword = (data) => {
  const schema = {
    newPassword: Joi.string().min(4).required(),
    oldPassword: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
  };
  return Joi.validate(data, schema);
};

const forgotPassword = (data) => {
  const schema = {
    newPassword: Joi.string().min(4).required(),
    otp: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
  };
  return Joi.validate(data, schema);
};

const sendOTP = (data) => {
  const schema = {
    email: Joi.string().min(4).required().email(),
  };
  return Joi.validate(data, schema);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.activeUserValidation = activeUserValidation;
module.exports.changePasswordValidation = changePassword;
module.exports.forgotPasswordValidation = forgotPassword;
module.exports.sendOTPValidation = sendOTP;
