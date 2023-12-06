const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);
main()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URI);
}

module.exports = main();
