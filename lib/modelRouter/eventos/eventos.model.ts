import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class Evento extends sequelize.Model {
    public id!: bigint;
    public campanhaId: number;
    public nome!: string;
    public descricao!: string;
    public data_inicio!: Date;
    public data_fim!: Date;
}

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
    sequelize: database,
    timestamps: false
});

