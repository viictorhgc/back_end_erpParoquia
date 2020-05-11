"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class Pastoral extends sequelize.Model {
}
exports.Pastoral = Pastoral;
Pastoral.init({
    id: {
        field: 'pas_id_pastoral',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'pas_no_pastoral',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 'pas_ds_pastoral',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    data_criacao: {
        field: 'pas_dt_criacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    },
    ativo: {
        field: 'pas_is_ativo',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_pas_pastoral',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=pastorais.model.js.map