"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class Grupo extends sequelize.Model {
}
exports.Grupo = Grupo;
Grupo.init({
    id: {
        field: 'grp_id_grupo',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'grp_no_grupo',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    data_criacao: {
        field: 'grp_dt_criacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_grp_grupo',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=grupos.model.js.map