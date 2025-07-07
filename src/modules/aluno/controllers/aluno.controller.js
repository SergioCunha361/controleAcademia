const Aluno = require("../models/aluno.model");
const bcrypt = require("bcryptjs");
class AlunoController {
  static async cadastrar(req, res) {
    try {
      const {aluno_nome,matricula, data_hora_entrada,data_hora_saida,plano,senha,} = req.body;
      if (!aluno_nome || !matricula || !data_hora_entrada || !data_hora_saida || !plano || !senha ) {
          return res.status(400).json({ msg: "Todos os campos devem serem preenchidos!" });
      }
      // criptografando a senha
      const senhaCriptografada = await bcrypt.hash(senha, 15);
      const existe = await Aluno.findByPk(matricula);
      if (existe) return res.status(409).json({ msg: "Matrícula já existe" });

      await Aluno.create({ aluno_nome,matricula, data_hora_entrada, data_hora_saida,plano,senha: senhaCriptografada, });
      res.status(200).json({ msg: "Aluno criado com sucesso" });
    } catch (error) {
       console.error("Erro completo:", error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          msg: "Erro de validação",
          erro: error.errors.map((e) => e.message),
        });
      }
      return res.status(500).json({
        msg: "Erro interno do servidor",
        erro: error.message,
      });
    }
  }

  static async listarPorMatricula(req, res) {
    try {
      const { matricula } = req.params;
      const aluno = await Aluno.findOne({
        where: { matricula },
        attributes: [
          "aluno_nome",
          "matricula",
          "data_hora_entrada",
          "data_hora_saida",
          "plano",
        ],
      });

      if (!aluno) {
        return res.status(404).json({ msg: "Não existe aluno cadastrado!" });
      }
      res.status(200).json(aluno);
    } catch (error) {
      res
        .status(500)
        .json({
          msg: "Erro do servidor. Tente novamente mais tarde!",
          erro: error.message,
        });
    }
  }

  static async listarTodos(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: [
          "aluno_nome",
          "matricula",
          "data_hora_entrada",
          "data_hora_saida",
          "plano",
        ],
      });

      if (!alunos || alunos.length === 0) {
        return res.status(404).json({ msg: "Não existe aluno cadastrado!" });
      }

      res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async atualizarPorMatricula(req, res) {
    try {
      const { matricula } = req.params;
      const { aluno_nome, data_hora_entrada, data_hora_saida, plano } =
        req.body;

      const aluno = await Aluno.findOne({ where: { matricula } });

      if (!aluno) {
        return res
          .status(404)
          .json({ msg: "Aluno não encontrado com essa matrícula!" });
      }

      await aluno.update({
        aluno_nome,
        data_hora_entrada,
        data_hora_saida,
        plano,
      });

      res.status(200).json({ msg: "Aluno atualizado com sucesso!", aluno });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro ao atualizar aluno.", erro: error.message });
    }
  }

  static async excluirPorMatricula(req, res) {
    try {
      const { matricula } = req.params;

      const aluno = await Aluno.findOne({ where: { matricula } });

      if (!aluno) {
        return res
          .status(404)
          .json({ msg: "Aluno não encontrado com essa matrícula!" });
      }

      await aluno.destroy();

      res.status(200).json({ msg: "Aluno deletado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro ao deletar aluno.", erro: error.message });
    }
  }
}

module.exports = AlunoController;
