const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskContoller');
const TaskValidation = require('../middlewares/TaskValidation');

//quando chama task ele chama essa funcao de criar (1- middleware 2-controler)
router.post('/', TaskValidation, TaskController.create);

router.put('/:id', TaskValidation, TaskController.update);
router.put('/:id/:done', TaskController.done); //Verifica se a tarefa está concluida ou não

router.delete('/:id', TaskController.delete); //filtro por todas as tarefas

router.get('/:id', TaskController.show);
router.get('/filter/all/:macaddress', TaskController.all); //filtro por todas as tarefas
router.get('/filter/late/:macaddress', TaskController.late); //Verifica se a tarefa está concluida ou não
router.get('/filter/today/:macaddress', TaskController.today); //Verifica as tarefas do dia
router.get('/filter/week/:macaddress', TaskController.week); //Verifica as tarefas da semana
router.get('/filter/month/:macaddress', TaskController.month); //Verifica as tarefas do mês
router.get('/filter/year/:macaddress', TaskController.year); //Verifica as tarefas do ano

module.exports = router;
