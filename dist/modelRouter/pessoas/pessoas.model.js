"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const conexao_db_1 = require("../../server/conexao.db");
const grupos_model_1 = require("../grupos/grupos.model");
const pessoasGrupos_model_1 = require("./pessoasGrupos.model");
const environment_1 = require("../../commom/environment");
class Pessoa extends sequelize.Model {
    validPassword(senha) {
        return bcrypt.compareSync(senha, this.senha);
    }
}
exports.Pessoa = Pessoa;
Pessoa.findByEmail = function (email) {
    return this.findOne({
        include: [{ model: grupos_model_1.Grupo }],
        where: { email: email }
    });
};
Pessoa.init({
    id: {
        field: 'pes_id_pessoa',
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'pes_no_pessoa',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false,
    },
    cpf: {
        field: 'pes_nu_cpf',
        type: new sequelize.DataTypes.STRING(11),
        allowNull: true,
    },
    sexo: {
        field: 'pes_tp_sexo',
        type: new sequelize.DataTypes.STRING(1),
        allowNull: false,
    },
    email: {
        field: 'pes_ds_email',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Favor inserir um e-mail válido"
            }
        }
    },
    dataNascimento: {
        field: 'pes_dt_nascimento',
        type: new sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    endereco: {
        field: 'pes_ds_endereco',
        type: new sequelize.DataTypes.STRING(1000),
        allowNull: false
    },
    telefone: {
        field: 'pes_ds_telefone',
        type: new sequelize.DataTypes.STRING(20),
        allowNull: false
    },
    senha: {
        field: 'pes_hash_senha',
        type: new sequelize.DataTypes.STRING,
        allowNull: true
    },
    podeLogar: {
        field: 'pes_is_login',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: true,
        validate: {
            isIn: {
                args: [['0', '1']],
                msg: "Favor preencher com um valor booleano"
            }
        }
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_pes_pessoa',
    sequelize: conexao_db_1.database,
    timestamps: false,
    modelName: "Pessoa"
});
//Manter a relação sempre no mesmo arquivo.
Pessoa.belongsToMany(grupos_model_1.Grupo, { through: pessoasGrupos_model_1.PessoaGrupo });
grupos_model_1.Grupo.belongsToMany(Pessoa, { through: pessoasGrupos_model_1.PessoaGrupo });
// Criptografando senha
Pessoa.beforeCreate((pessoa, options) => {
    if (pessoa.podeLogar) {
        console.log(pessoa.senha);
        if (pessoa.senha) {
            return bcrypt.hash(pessoa.senha, environment_1.environment.security.saltRounds)
                .then(hash => {
                pessoa.senha = hash;
            })
                .catch(err => {
                throw new Error(err);
            });
        }
        else {
            throw new Error("A senha deve ser preenchida quando a pessoa tiver o login habilitado");
        }
    }
    else {
        // Limpa a senha caso o usuário não possa fazer login
        pessoa.senha = undefined;
    }
});
//# sourceMappingURL=pessoas.model.js.map