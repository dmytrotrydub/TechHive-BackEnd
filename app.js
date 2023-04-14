const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello').status(200);
});

app.listen(8080, function (req, res) {
  console.log(`App listening at http: ${process.env.PORT}`);
});
