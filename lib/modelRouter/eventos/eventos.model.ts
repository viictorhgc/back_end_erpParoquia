import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class Evento extends sequelize.Model {
    public id!: bigint;
    CampanhaId: number;
    public nome!: string;
    public descricao!: string;
    public data_inicio!: Date;
    public data_fim!: Date;
}

Evento.init({
    id: {
        field: 't007_id_evento',
        type: sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    CampanhaId: {
        field: 't006_id_campanha',
        type: sequelize.DataTypes.INTEGER,
        allowNull: true,
    },
    nome: {
        field: 't007_no_evento',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 't007_de_evento',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false,
    },
    data_inicio: {
        field: 't007_dt_inicio',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        field: 't007_dt_fim',
        type: new sequelize.DataTypes.DATE,
        allowNull: false,
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
    tableName: 't007_evento',
    sequelize: database,
    timestamps: false
});

