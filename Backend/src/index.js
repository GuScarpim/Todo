const express = require('express');
const cors = require('cors');
const server = express(); //Inicializa o servidor
server.use(cors());
server.use(express.json()); //recebendo info formato json

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes); 

server.listen(3001, () => {
  console.log('API ONLINE')
});