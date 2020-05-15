import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class Pastoral extends sequelize.Model {
    public id!: bigint;
    public nome!: string;
    public descricao!: string;
    public data_criacao!: Date;
    public ativo!: boolean;
}

Pastoral.init({
    id: {   
        field: 'pas_id_pastoral',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 'pas_no_pastoral',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 'pas_ds_pastoral',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    dataCriacao: {
        field: 'pas_dt_criacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    },
    ativo: {
        field: 'pas_is_ativo',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 'tb_pas_pastoral',
    sequelize: database,
    timestamps: false
});

