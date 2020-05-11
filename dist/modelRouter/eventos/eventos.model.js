"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class Evento extends sequelize.Model {
}
exports.Evento = Evento;
Evento.init({
    id: {
        field: 'evt_id_evento',
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    campanhaId: {
        field: 'cpa_id_campanha',
        type: sequelize.DataTypes.INTEGER,
        allowNull: true,
    },
    nome: {
        field: 'evt_no_evento',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 'evt_ds_evento',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false,
    },
    data_inicio: {
        field: 'evt_dt_inicio',
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    },
    data_fim: {
        field: 'evt_dt_fim',
        type: new sequelize.DataTypes.DATE,
        allowNull: true,
        validate: {
            startDateAfterEndDate() {
                if (this.data_inicio > this.data_fim) {
                    throw new Error('data_frim precisa ser posterior a data de início.');
                }
            }
        }
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_evt_evento',
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=eventos.model.js.map