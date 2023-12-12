const { getMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.get("/get", getMessages);

module.exports = router;
