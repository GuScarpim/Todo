const TaskModel = require('../model/TaskModel');
const { response } = require('express');
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = require('date-fns');

const current = new Date(); //utilizar a data e a hora atual

class TaskController {

  async create(req, res) {
    const task = new TaskModel(req.body); //recebe informação pelo corpo
    await task  //salva no mongo, then(certo) catch(errado)
      .save()
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      })
  }

  //new: true  se atualizou o dado ele muda se for o mesmo ele mantem
  async update(req, res) {
    await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      })
  }

  async all(req, res) {
    await TaskModel.find({ macaddress: { '$in': req.params.macaddress } }) //recuperar por parametro
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      })
  }

  async show(req, res) {
    await TaskModel.findById(req.params.id)
      .then(response => {
        if (response)
          return res.status(200).json(response);
        else
          return res.status(404).json({ error: 'tarefa não encontrada' });
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async delete(req, res) {
    await TaskModel.deleteOne({ '_id': req.params.id })
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async done(req, res) {
    await TaskModel.findByIdAndUpdate(
      { '_id': req.params.id },
      { 'done': req.params.done }, //campo que vou atualizar
      { new: true }) //devolve os dados atualizados
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async late(req, res) { //tarefas atrazadas
    await TaskModel.find({ //busca por tarefas com data e hora current
      'when': { '$lt': current }, //menor do que a data atual
      'macaddress': { '$in': req.params.macaddress } //verifica em qual celular esta
    })
      .sort('when') //devolve organizada por hora
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async today(req, res) {
    await TaskModel
      .find({
        'macaddress': { '$in': req.params.macaddress }, //in lista as tarefas
        'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) } //lt menor que, maior ou igual a que, pesquisa por data maior que determinado valor e menor
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async week(req, res) {
    await TaskModel
      .find({
        'macaddress': { '$in': req.params.macaddress }, //in lista as tarefas
        'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) } //data e hora maior ou igual do comeco e do fim da semana
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async month(req, res) {
    await TaskModel
      .find({
        'macaddress': { '$in': req.params.macaddress }, //in lista as tarefas
        'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) } //data e hora maior ou igual do comeco e do fim da semana
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async year(req, res) {
    await TaskModel
      .find({
        'macaddress': { '$in': req.params.macaddress }, //in lista as tarefas
        'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) } //data e hora maior ou igual do comeco e do fim da semana
      })
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

};

module.exports = new TaskController();