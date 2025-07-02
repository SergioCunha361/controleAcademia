const express = require('express');
const AlunoController = require('../controllers/aluno.controller');
const AutenticacaoMiddleware = require('../middleware/aluno.middleware');
const router = express.Router();

// 🔓 Rota pública (cadastro)
router.post('/cadastrar', AlunoController.cadastrar);

// 🔐 Rotas privadas (token obrigatório)
router.get('/alunos', AutenticacaoMiddleware.autenticarToken, AlunoController.listarTodos);
router.get('/alunos/matricula/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.listarPormatricula);
router.put('/alunos/matricula/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.atualizarPorMatricula);
router.delete('/alunos/matricula/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.excluirPorMatricula);

module.exports = router;
