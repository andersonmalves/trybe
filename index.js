const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

async function getCrush() {
  const data = await fs.readFile('./crush.json');
  return JSON.parse(data);
}

app.get('/crush', async (req, response) => {
  const data = await getCrush();
  response.status(SUCCESS).send(data);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
