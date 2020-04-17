"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class FluxoCaixa extends sequelize.Model {
}
exports.FluxoCaixa = FluxoCaixa;
FluxoCaixa.init({
    id: {
        field: 't005_id_fluxo_caixa',
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    pagadorId: {
        field: 't001_id_pagador',
        type: new sequelize.DataTypes.BIGINT,
        allowNull: true,
    },
    receptorId: {
        field: 't001_id_receptor',
        type: new sequelize.DataTypes.BIGINT,
        allowNull: false,
    },
    receitaDespesaId: {
        field: 't004_id_receita_despesa',
        type: new sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    data_efetivacao: {
        field: 't005_dt_efetivacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: false,
    },
    valor: {
        field: 't005_valor',
        type: new sequelize.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    schema: 'erp_paroquia',
    tableName: 't005_fluxo_caixa',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=fluxosCaixa.model.js.map