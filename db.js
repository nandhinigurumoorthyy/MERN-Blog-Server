const mongoose = require("mongoose");

const mongoDBURI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@arnifi.f2trhpx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=arnifi`
async function createDbConnection() {
  try {
    await mongoose.connect(mongoDBURI);
    console.log("connection established !!!---");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createDbConnection,
};