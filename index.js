const express = require('express');

const app = express();
const PORT = 3000;

const { userRoutes, categoryRoutes } = require('./routes');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRoutes);
app.use(categoryRoutes);

app.listen(PORT, () => {
  console.log(`BlogsApi listen on ${PORT}`);
});
