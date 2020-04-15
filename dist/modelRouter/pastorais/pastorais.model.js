"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class Pastoral extends sequelize.Model {
}
exports.Pastoral = Pastoral;
Pastoral.init({
    id: {
        field: 't008_id_pastoral',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 't008_no_pastoral',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 't008_de_pastoral',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    data_criacao: {
        field: 't008_dt_criacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    ativo: {
        field: 't008_is_ativo',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't008_pastoral',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=pastorais.model.js.map