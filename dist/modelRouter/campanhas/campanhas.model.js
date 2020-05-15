"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
const eventos_model_1 = require("../eventos/eventos.model");
class Campanha extends sequelize.Model {
}
exports.Campanha = Campanha;
Campanha.init({
    id: {
        field: 'cpa_id_campanha',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'cpa_no_campanha',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 'cpa_ds_campanha',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    dataCriacao: {
        field: 'cpa_dt_inicio',
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    },
    dataFim: {
        field: 'cpa_dt_fim',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: true
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_cpa_campanha',
    sequelize: conexao_db_1.database,
    timestamps: false
});
Campanha.hasMany(eventos_model_1.Evento, { foreignKey: 'campanhaId' });
//# sourceMappingURL=campanhas.model.js.map