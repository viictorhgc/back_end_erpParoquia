"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class FormasPagamento extends sequelize.Model {
}
exports.FormasPagamento = FormasPagamento;
FormasPagamento.init({
    id: {
        field: 'id_fpg_forma_pagamento',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'nome_fpg_forma_pagamento',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_fpg_forma_pagamento',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=formasPagamento.model.js.map