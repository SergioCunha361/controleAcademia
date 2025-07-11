const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/configDB");

const Aluno = sequelize.define(
  "Aluno",
  {
    aluno_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        is: {
          args: /^[A-Za-z]\d{8}$/,
          msg: "A matricula deve iniciar com uma letra  e 8 números!",
        },
      },
    },
    data_hora_entrada: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "Data e hora inválidas" },
      },
    },

      data_hora_saida: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Data e hora inválidas" },
        },
      },
   
    plano: {
      type: DataTypes.STRING,
      allowNull: false,
    },
senha: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    isStrong(value) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if (!regex.test(value)) {
        throw new Error("A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.");
      }
    }
  }
}




  },
  {
    tableName: "alunoAcad",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Aluno;