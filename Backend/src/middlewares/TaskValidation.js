const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');
//isPast verifica se a data esta no passado
const TaskValidation = async (req, res, next) => {

  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress)
    return res.status(400).json({ error: 'Macaddres é obrigatório' });
  else if (!type)
    return res.status(400).json({ error: 'Tipo é obrigatório' });
  else if (!title)
    return res.status(400).json({ error: 'Titulo é obrigatório' });
  else if (!description)
    return res.status(400).json({ error: 'Descrição é obrigatório' });
  else if (!when)
    return res.status(400).json({ error: 'Data e hora são obrigatórios' });
  
  else {
    let exists;

    if (req.params.id) {//se na req existir um id é pq eu quero atualizar a tarefa
      exists = await TaskModel.
        findOne(
          {
            '_id': { '$ne': req.params.id }, //se vier diferente ele execulta
            'when': { '$eq': new Date(when) }, //verifica se tem a mesma data e horario
            'macaddress': { '$in': macaddress } // e o mesmo macaddress
          });
    } else {
      if (isPast(new Date(when)))
        return res.status(400).json({ error: 'Escolha uma data e hora fultura' });
      exists = await TaskModel. //cadastra nova tarefa nao existe id
        findOne(
          {
            'when': { '$eq': new Date(when) }, //verifica se tem a mesma data e horario
            'macaddress': { '$in': macaddress } // e o mesmo macaddress
          });
    }

    if (exists) {
      return res.status(400).json({ error: 'Já existe uma tarefa nesse dia e horário' });
    }
    next();
  }
}

module.exports = TaskValidation;