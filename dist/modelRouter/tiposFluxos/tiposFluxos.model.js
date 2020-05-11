"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class TipoFluxo extends sequelize.Model {
}
exports.TipoFluxo = TipoFluxo;
TipoFluxo.init({
    id: {
        field: 'tfx_id_tipo_fluxo',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'tfx_no_tipo_fluxo',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 'tfx_ds_tipo_fluxo',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false,
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_tfx_tipo_fluxo',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=tiposFluxos.model.js.map