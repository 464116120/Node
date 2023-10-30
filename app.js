const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./products");
const tshirt = require("./tshirt");
const short = require("./short");
const shoes = require("./shoes");
const offer = require("./offer")
const stripe = require('stripe')('sk_test_51O703VHC6bvoeKYtn71skApq6dgOYh0cJ7NWVAi3iZDlxZ6qIoM3IhBJgQhVcnKpjDwF0hjH2Q847XuDw1uWABA00031tmuInX');
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
app.get("/offer", (req, res) => {
  res.send(offer);
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
app.get("/offer/:id", (req, res) => {
  const offeritem = offer.find((item) => {
    return item.id == req.params.id;
  });
  res.send(offeritem);
});

app.post('/payment', (req, res) => {
  const { token, product } = req.body;
  const { name, price, productBy } = product;

  const amount = price * 100; // السعر بالسنتات

  stripe.customers.create({
    email: token.email,
    source: token.id,
  })
  .then(customer => {
    stripe.charges.create({
      amount: amount,
      currency: 'usd',
      customer: customer.id,
      description: `Purchase of ${name} from ${productBy}`,
    })
  })
  .then(charge => res.json(charge))
  .catch(error => console.error(error));
});
const port = process.env.PORT || 5000;
app.listen(port, console.log(`http://localhost:${port}`));
