const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = await response.data;
    res.json(transactions);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log("post is listening....");
});
