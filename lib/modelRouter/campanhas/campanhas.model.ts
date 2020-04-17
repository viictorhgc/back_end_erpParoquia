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
        field: 't006_id_campanha',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 't006_no_campanha',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 't006_de_campanha',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    data_criacao: {
        field: 't006_dt_inicio',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        field: 't006_dt_fim',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't006_campanha',
    sequelize: database,
    timestamps: false
});

Campanha.hasMany(Evento)
Evento.hasOne(Campanha)


