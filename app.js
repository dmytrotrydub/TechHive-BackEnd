const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', function (req, res) {
  res.send('Hello').status(200);
});
console.log(process.env.PORT);
app.listen(8080, function (req, res) {
  console.log(`App listening at http: ${process.env.PORT}`);
});
