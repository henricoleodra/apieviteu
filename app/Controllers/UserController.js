const db = require("../../database");
const bcrypt = require("bcrypt");
const User = require("../Models/User");

const getAllUsers = (req, res, next) => {
  db.query(User.getAllUsers(), (err, result) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
    }

    res.status(200).json({
      data: result,
    });
  });
};

const getAllUsers2 = (req, res, next) => {
  User.getAllUsers2((err, result) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
    }
    res.status(200).json({
      data: result,
    });
  });
};

const createNewUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);
    const userData = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassword: hashedPassword,
    };
    const user = new User(userData);
    User.getUserByEmail(userData.userEmail, (err, data) => {
      if (err) {
        res.status(401).json({
          error: err.message,
        });
      }

      if (data.length >= 1) {
        if (data[0].userEmail === userData.userEmail) {
          res.status(401).json({
            message: "Email already exists",
          });
        }
      } else {
        user.addUser((err, result) => {
          if (err) {
            res.status(401).json({
              error: err.message,
            });
          }

          User.getUserById(result.insertId, (err, data) => {
            if (err) {
              res.status(401).json({
                error: err.message,
              });
            }

            res.status(200).json({
              data: {
                idUser: data[0].idUser,
                userName: data[0].userName,
                userEmail: data[0].userEmail,
              },
            });
          });
        });
      }
    });
  } catch {
    res.status(500);
  }
};

module.exports = {
  getAllUsers,
  getAllUsers2,
  createNewUser,
};
