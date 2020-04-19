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
        field: 't008_id_pastoral',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        field: 't008_no_pastoral',
        type: new sequelize.DataTypes.STRING(255),
        allowNull: false,
    },
    descricao: {
        field: 't008_de_pastoral',
        type: new sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    data_criacao: {
        field: 't008_dt_criacao',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    ativo: {
        field: 't008_is_ativo',
        type: new sequelize.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't008_pastoral',
    sequelize: database,
    timestamps: false
});

