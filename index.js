const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
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

app.get('/crush/:id', async (request, response) => {
  const data = await getCrush();
  const result = data.find((el) => el.id === parseInt(request.params.id, 10));
  if (result === undefined) { 
    return response.status(NOT_FOUND).send({ message: 'Crush não encontrado' });
  }
  response.status(SUCCESS).send(result);
});

function checkEmail(email) {
  const regex = /\S+@\S+\.\S+/.test(email); // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!email) { throw new Error('O campo "email" é obrigatório'); }
  if (!regex) { throw new Error('O "email" deve ter o formato "email@email.com"'); }
}

function checkPassword(password) {
  if (!password) { throw new Error('O campo "password" é obrigatório'); }
  if (password.toString().length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const token = crypto.randomBytes(8).toString('hex'); // Source: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js

  try {
    checkEmail(email);
    checkPassword(password);
    response.status(SUCCESS).send({ token });
  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }  
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
