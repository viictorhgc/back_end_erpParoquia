"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class Grupo extends sequelize.Model {
}
exports.Grupo = Grupo;
Grupo.init({
    id: {
        field: 't002_id_grupo',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 't002_no_grupo',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    data_criacao: {
        field: 't002_dt_criacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    ativo: {
        field: 't002_is_ativo',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't002_grupo',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=grupos.model.js.map