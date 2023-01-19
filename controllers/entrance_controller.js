const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
  activeUserValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  sendOTPValidation,
} = require("../validation");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const message = require("../config/constant");

function generateOtp() {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
}

function emailSender() {
  return nodemailer.createTransport({
    host: "mail.fordsoft.tech",
    port: 465,
    auth: {
      user: "sender@fordsoft.tech",
      pass: "9LCi0mcb?0St",
    },
  });
}
async function encriptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function sendOTPToEmail(otp, email) {
  const sender = emailSender();
  const message = {
    from: "sender@fordsoft.tech",
    to: email,
    subject: "Account Activation Code",
    text: "Kindly use this code to activation your account: " + otp,
  };
  const sendResult = await sender.sendMail(message);
  console.log(sendResult);
}

module.exports = {
  signupUser: async (req, res) => {
    //const otp = generateOtp();
    //Lets validate the data before a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({ where: { email: req.body.email } });
    if (emailExist)
      return res
          .status(400)
          .send({ status: message.FAIL, data: message.DATA_SIGNUP_EXIST });

    // Hash passwords

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      name: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      accountStatus: true,
      category: req.body.category,
      account_type: req.body.serviceList,
      activationOtp: "",
      password: await encriptPassword(req.body.password),
    });
    try {
      const savedUser = await user.save();
      //await sendOTPToEmail(savedUser.activationOtp, savedUser.email);
      return res.send({
        status: message.SUCCESS,
        data: {
          message: message.DATA_SIGNUP,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
    } catch (error) {
      console.log(error);
      return res
          .status(400)
          .send({ status: message.FAIL, data: message.DATA_WRONG });
    }
  },

  loginUser: async (req, res) => {
    //Lets validate the data before we a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the email exist
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    if (!user)
      return res
          .status(404)
          .send({ status: message.FAIL, data: message.USER_NOT_FOUND });

    // if (!user.accountStatus)
    //   return res
    //       .status(401)
    //       .send({ status: message.FAIL, data: message.DATA_ACCOUNT_INACTIVE });
    //Password is Correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send({
        status: message.FAIL,
        data: message.USER_NOT_FOUND,
      });

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "60d",
    });
    res.header("auth_token", token).send({
      status: "success",
      data: {
        token: token,
        firstName: user.firstName,
        lastName: user.lastName,
        uuid: user.uuid,
        email: user.email,
        phone: user.phone,
      },
    });
  },

  activateUser: async (req, res) => {
    //Lets validate the data before we a user
    const { error } = activeUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { otp, email } = req.body;
    //checking if the email exist
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (!user)
      return res
          .status(400)
          .send({ status: message.FAIL, data: message.DATA_INVALID_NO });

    if (user.accountStatus) {
      return res.send({
        status: message.SUCCESS,
        data: message.ACCOUNT_ALREADY_ACTIVE,
      });
    }

    if (user.activationOtp === otp && !user.accountStatus) {
      User.update(
          // Values to update
          {
            accountStatus: true,
            activationOtp: "0000",
          },
          {
            // Clause
            where: {
              id: user.id,
            },
          }
      )
          .then((result) => {
            return res.send({
              status: message.SUCCESS,
              data: message.DATA_ACCOUNT_ACTIVATED,
            });
          })
          .catch((error) => {
            return res.send({ status: message.FAIL, data: message.DATA_WRONG });
          });
    } else {
      return res.send({ status: message.FAIL, data: message.DATA_OTP });
    }
  },
  changePassword: async (req, res) => {
    //Lets validate the data before we a user
    const { error } = changePasswordValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { newPassword, oldPassword, email } = req.body;
    //checking if the email exist
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (!user)
      return res
          .status(400)
          .send({ status: message.FAIL, data: message.DATA_INVALID_NO });

    const validPass = await bcrypt.compare(oldPassword, user.password);

    if (!validPass)
      return res.status(400).send({
        status: message.FAIL,
        data: message.PASSWORD_NOT_MATCH,
      });

    User.update(
        // Values to update
        {
          password: await encriptPassword(newPassword),
        },
        {
          // Clause
          where: {
            id: user.id,
          },
        }
    )
        .then((result) => {
          return res.send({
            status: message.SUCCESS,
            data: message.PASSWORD_CHANGED,
          });
        })
        .catch((error) => {
          return res.send({ status: message.FAIL, data: message.DATA_WRONG });
        });
  },

  forgotPassword: async (req, res) => {
    //Lets validate the data before we a user
    const { error } = forgotPasswordValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { newPassword, otp, email } = req.body;
    //checking if the email exist
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (!user)
      return res
          .status(400)
          .send({ status: message.FAIL, data: message.DATA_INVALID_NO });

    if (user.activationOtp != otp)
      return res
          .status(404)
          .send({ status: message.FAIL, data: message.INVALID_OTP });

    User.update(
        // Values to update
        {
          password: await encriptPassword(newPassword),
        },
        {
          // Clause
          where: {
            id: user.id,
          },
        }
    )
        .then((result) => {
          return res.send({
            status: message.SUCCESS,
            data: message.PASSWORD_RESET,
          });
        })
        .catch((error) => {
          return res.send({ status: message.FAIL, data: message.DATA_WRONG });
        });
  },

  sendOtpToUser: async (req, res) => {
    //Lets validate the data before we a user
    const { error } = sendOTPValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { email } = req.body;
    //checking if the email exist
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (!user)
      return res
          .status(400)
          .send({ status: message.FAIL, data: message.DATA_INVALID_NO });
    const OTP = generateOtp();

    await sendOTPToEmail(OTP, email);

    User.update(
        // Values to update
        {
          activationOtp: OTP,
        },
        {
          // Clause
          where: {
            id: user.id,
          },
        }
    )
        .then((result) => {
          return res.send({
            status: message.SUCCESS,
            data: message.OTP_SENT,
          });
        })
        .catch((error) => {
          return res.send({ status: message.FAIL, data: message.DATA_WRONG });
        });
  },
};
