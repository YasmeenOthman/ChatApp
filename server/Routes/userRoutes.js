const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// retrieve all the users except the current login in user
router.get("/allusers/:id", getAllUsers);
module.exports = router;
