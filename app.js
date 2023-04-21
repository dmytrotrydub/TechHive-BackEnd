const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes');


app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);

app.listen(process.env.PORT, function (req, res) {
  console.log(`App listening at http: ${process.env.URL}${process.env.PORT}`);
});
