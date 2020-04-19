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
        field: 't001_id_pessoa',
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 't001_no_pessoa',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false,
    },
    email: {
        field: 't001_ds_email',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Favor inserir um e-mail válido"
            }
        }
    },
    dataNascimento: {
        field: 't001_dt_nascimento',
        type: new sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    endereco: {
        field: 't001_ds_endereco',
        type: new sequelize.DataTypes.STRING(1000),
        allowNull: false
    },
    telefone: {
        field: 't001_ds_telefone',
        type: new sequelize.DataTypes.STRING(20),
        allowNull: false
    },
    senha: {
        field: 't001_hash_senha',
        type: new sequelize.DataTypes.STRING,
        allowNull: true
    },
    podeLogar: {
        field: 't001_is_login',
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
    tableName: 't001_pessoa',
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