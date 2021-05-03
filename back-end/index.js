const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Ok!');
});
