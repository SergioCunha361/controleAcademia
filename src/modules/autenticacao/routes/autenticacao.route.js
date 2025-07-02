const express = require('express');
const AlunoController = require('../../aluno/controllers/aluno.controller');
const AutenticacaoMiddleware = require('../middleware/aluno.middleware');
const router = express.Router();

// 🔓 Rota pública para cadastro de aluno
router.post('/cadastrar', AlunoController.cadastrar);

// 🔐 Rotas privadas protegidas por token
router.get('/alunos', AutenticacaoMiddleware.autenticarToken, AlunoController.listarTodos);
router.get('/alunos/matricula/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.listarPorMatricula);
router.put('/alunos/matricula/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.atualizarPorMatricula);
router.delete('/alunos/matricula/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.excluirPorMatricula);

module.exports = router;



