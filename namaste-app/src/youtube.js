const axios = require("axios");

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});
