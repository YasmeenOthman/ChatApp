const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/add", addMessage);
router.get("/get", getMessages);

module.exports = router;
