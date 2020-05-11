import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'
import { Evento } from '../eventos/eventos.model';

export class Campanha extends sequelize.Model {
    public id!: bigint;
    public nome!: string;
    public descricao!: string;
    public data_criacao!: Date;
    public data_fim: Date;
}

Campanha.init({
    id: {
        field: 'cpa_id_campanha',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'cpa_no_campanha',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 'cpa_ds_campanha',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    data_criacao: {
        field: 'cpa_dt_inicio',
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    },
    data_fim: {
        field: 'cpa_dt_fim',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: true
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_cpa_campanha',
    sequelize: database,
    timestamps: false
});

Campanha.hasMany(Evento, {foreignKey: 'campanhaId'})


