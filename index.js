const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises;
const checkToken = require('./middlewares/checkAuthorization');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const PORT = '3000';

async function readCrush() {
  const data = await fs.readFile('./crush.json');
  return JSON.parse(data);
}

app.get('/crush', async (_request, response) => {
  const data = await readCrush();
  response.status(SUCCESS).send(data);
});

app.get('/crush/:id', async (request, response) => {
  const data = await readCrush();
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

app.use(checkToken);

function checkName(name) {
  if (!name) { throw new Error('O campo "name" é obrigatório'); }
  if (name.length <= 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}

function checkAge(age) {
  if (!age) { throw new Error('O campo "age" é obrigatório'); }
  if (parseInt(age, 10) <= 18) {
    throw new Error('O crush deve ser maior de idade');
  }
}

function checkDate(date) {
  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
}

function checkDatedAt(datedAt) {
  const regexDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/g.test(datedAt);
  if (!regexDate) { throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"'); }
}

function checkRate(rate) {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

app.post('/crush', async (request, response) => {
  const { name, age, date } = request.body;

  try {
    checkName(name);
    checkAge(age);
    checkDate(date);
    checkDatedAt(date.datedAt);
    checkRate(date.rate);

    const data = await readCrush();
    const newCrush = { id: data.length + 1, name, age, date };
    response.status(CREATED).send(newCrush);

  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
