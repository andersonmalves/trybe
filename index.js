const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
const PORT = '3000';

async function getCrush() {
  const data = await fs.readFile('./crush.json');
  return JSON.parse(data);
}

app.get('/crush', async (_request, response) => {
  const data = await getCrush();
  response.status(SUCCESS).send(data);
});

app.get('/crush/:id', async (_request, response) => {
  const data = await getCrush();
  const result = data.find((el) => el.id === parseInt(_request.params.id, 10));
  if (result === undefined) { 
    return response.status(NOT_FOUND).send({ message: 'Crush não encontrado' });
  }
  response.status(SUCCESS).send(result);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
