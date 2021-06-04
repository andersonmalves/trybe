const app = require('express')();
const http = require('http').createServer(app);
const { instrument } = require('@socket.io/admin-ui');

const cors = require('cors');
require('dotenv').config();

const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io/'],
    methods: ['GET', 'POST'],
  },
});

const { generateMessage } = require('./helpers');

instrument(io, { auth: false });
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());

app.get('/', (_, response) => {
  response.render('board');
});

io.on('connection', (client) => {
  console.log(`Novo usuário conectado ${client.id}`);

  client.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', generateMessage.create(nickname, chatMessage));
  });

  client.on('disconnect', () => {
    console.log(`${client.id} saiu do chat`);
  });
});

http.listen(PORT, () => {
  console.log(`I'm playing on ${PORT}`);
});
