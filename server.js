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

const { chatModel } = require('./models');
const { message } = require('./helpers');

instrument(io, { auth: false });
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());

chatModel.clearMessages();

app.get('/', async (_, response) => {
  const history = await chatModel.getAllMessages();
  response.render('board', { history });
});

const onlineUsers = [];

io.on('connection', (client) => {
  // console.log(`Novo usuário conectado ${client.id}`);

  client.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', message.create(nickname, chatMessage));
  });

  client.on('newUserOnline', (user) => {
    onlineUsers.unshift({ id: client.id, nickname: user });
    io.emit('onlineUsers', onlineUsers);
  });

  client.on('changeNickname', (newNickname) => {
    const index = onlineUsers.findIndex((element) => element.id === client.id);
    if (index !== -1) onlineUsers.splice(index, 1);
    onlineUsers.unshift({ id: client.id, nickname: newNickname });
    io.emit('onlineUsers', onlineUsers);
  });

  client.on('disconnect', () => {
    const index = onlineUsers.findIndex((element) => element.id === client.id);
    if (index !== -1) onlineUsers.splice(index, 1);
    io.emit('onlineUsers', onlineUsers);
    // console.log(`${client.id} saiu do chat`);
  });
});

http.listen(PORT, () => {
  console.log(`I'm playing on ${PORT}`);
});
