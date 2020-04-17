"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
const grupos_model_1 = require("../grupos/grupos.model");
class Pessoa extends sequelize.Model {
}
exports.Pessoa = Pessoa;
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
    data_nascimento: {
        field: 't001_dt_nascimento',
        type: new sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    endereco: {
        field: 't001_de_endereco',
        type: new sequelize.DataTypes.STRING(1000),
        allowNull: false
    },
    telefone: {
        field: 't001_de_telefone',
        type: new sequelize.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't001_pessoa',
    sequelize: conexao_db_1.database,
    timestamps: false
});
class Pessoa_Grupo extends sequelize.Model {
}
exports.Pessoa_Grupo = Pessoa_Grupo;
Pessoa_Grupo.init({
    PessoaId: {
        field: 't001_id_pessoa',
        type: sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
    },
    GrupoId: {
        field: 't002_id_grupo',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
    },
    data_inclusao: {
        field: 't003_dt_inclusao',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    data_remocao: {
        field: 't003_dt_remocao',
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't003_pessoa_grupo',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//Manter a relação sempre no mesmo arquivo.
Pessoa.belongsToMany(grupos_model_1.Grupo, { through: Pessoa_Grupo });
grupos_model_1.Grupo.belongsToMany(Pessoa, { through: Pessoa_Grupo });
//# sourceMappingURL=pessoas.model.js.map