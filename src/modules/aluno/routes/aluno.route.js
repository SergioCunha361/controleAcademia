const express = require('express');
const AlunoController = require('../controllers/aluno.controller');
const AutenticacaoMiddleware = require('../middleware/aluno.middleware');

const router = express.Router();

// 🔓 Rota pública (cadastro)
router.post('/checkins', AlunoController.cadastrar);

// 🔐 Rotas privadas (token obrigatório)
router.get('/checkins', AutenticacaoMiddleware.autenticarToken, AlunoController.listarTodos);
router.get('/checkins/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.listarPorMatricula);
router.put('/checkins/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.atualizarPorMatricula);
router.delete('/checkins/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.excluirPorMatricula);


module.exports = router;

