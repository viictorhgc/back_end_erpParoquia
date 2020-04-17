"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class ReceitaDespesa extends sequelize.Model {
}
exports.ReceitaDespesa = ReceitaDespesa;
ReceitaDespesa.init({
    id: {
        field: 't004_id_receita_despesa',
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 't004_no_receita_despesa',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    schema: 'erp_paroquia',
    tableName: 't004_receita_despesa',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=receitasDespesas.model.js.map