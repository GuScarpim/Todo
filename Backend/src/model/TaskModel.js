const mongoose = require('../config/database'); //devolve o mongoose ja conectado
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  macaddress: { type: String, required: true }, //captura a atividade
  type: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  when: { type: Date, required: true }, //armazena data e hora juntos
  done: { type: Boolean, default: false }, //criou vai ser falso padrao
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema); 