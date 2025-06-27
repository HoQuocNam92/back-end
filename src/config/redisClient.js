const { createClient } = require("@redis/client");
const client = createClient({
  url: process.env.REDIS_URL
});
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
    console.log("Check reds", process.env.REDIS_URL)
  })
  .catch((err) => console.error("Error connecting to Redis:", err));

module.exports = client;
