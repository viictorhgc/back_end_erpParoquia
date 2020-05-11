"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
const pessoas_model_1 = require("../pessoas/pessoas.model");
const tiposFluxos_model_1 = require("../tiposFluxos/tiposFluxos.model");
const formasPagamento_model_1 = require("../formasPagamento/formasPagamento.model");
class FluxoCaixa extends sequelize.Model {
}
exports.FluxoCaixa = FluxoCaixa;
FluxoCaixa.init({
    id: {
        field: 'fcx_id_fluxo_caixa',
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    pagadorId: {
        field: 'pes_id_pagador',
        type: new sequelize.DataTypes.BIGINT,
        allowNull: true,
    },
    receptorId: {
        field: 'pes_id_receptor',
        type: new sequelize.DataTypes.BIGINT,
        allowNull: false,
    },
    tipoFluxoId: {
        field: 'tfx_id_tipo_fluxo',
        type: new sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    formaPagamentoId: {
        field: 'fpg_id_forma_pagamento',
        type: new sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    data_efetivacao: {
        field: 'fcx_dt_efetivacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: true,
    },
    valor: {
        field: 'fcx_valor',
        type: new sequelize.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_fcx_fluxo_caixa',
    sequelize: conexao_db_1.database,
    timestamps: false
});
FluxoCaixa.belongsTo(pessoas_model_1.Pessoa, { as: 'Pagador', foreignKey: 'pagadorId' });
FluxoCaixa.belongsTo(pessoas_model_1.Pessoa, { as: 'Receptor', foreignKey: 'receptorId' });
FluxoCaixa.belongsTo(tiposFluxos_model_1.TipoFluxo, { foreignKey: 'tipoFluxoId' });
FluxoCaixa.belongsTo(formasPagamento_model_1.FormasPagamento, { foreignKey: 'formaPagamentoId' });
//# sourceMappingURL=fluxosCaixa.model.js.map