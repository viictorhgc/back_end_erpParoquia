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
        field: 't006_id_campanha',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 't006_no_campanha',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 't006_de_campanha',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    data_criacao: {
        field: 't006_dt_inicio',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        field: 't006_dt_fim',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't006_campanha',
    sequelize: conexao_db_1.database,
    timestamps: false
});
Campanha.hasMany(eventos_model_1.Evento);
eventos_model_1.Evento.hasOne(Campanha);
//# sourceMappingURL=campanhas.model.js.map