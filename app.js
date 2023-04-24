const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const usersRoutes = require('./routes/usersRoutes');
const professionalRoutes = require('./routes/professionalRoutes');

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/professionals', professionalRoutes);

app.listen(process.env.PORT, function (req, res) {
  console.log(`App listening at http: ${process.env.URL}${process.env.PORT}`);
});
