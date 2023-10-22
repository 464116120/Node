const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./products");
const tshirt = require("./tshirt");
const short = require("./short");
const shoes = require("./shoes");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...")
});
app.get("/products", (req, res) => {
  res.send(products);
});
app.get("/tshirt", (req, res) => {
  res.send(tshirt);
});
app.get("/short", (req, res) => {
  res.send(short);
});
app.get("/shoes", (req, res) => {
  res.send(shoes);
});
app.get("/products/:id", (req, res) => {
  const oneProduct = products.find((item) => {
    return item.id == req.params.id;
  });

  res.send(oneProduct);
});
app.get("/tshirt/:id", (req, res) => {
  const oneTshirt = tshirt.find((item) => {
    return item.id == req.params.id;
  });

  res.send(oneTshirt);
});
app.get("/short/:id", (req, res) => {
  const oneShort = short.find((item) => {
    return item.id == req.params.id;
  });
  res.send(oneShoes);
});
  
app.get("/shoes/:id", (req, res) => {
  const oneShoes = shoes.find((item) => {
    return item.id == req.params.id;
  });
  res.send(oneShoes);
});



const port = process.env.PORT || 5000;
app.listen(port, console.log(`http://localhost:${port}`));
