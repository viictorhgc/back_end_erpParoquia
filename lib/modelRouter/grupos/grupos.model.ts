import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class Grupo extends sequelize.Model {
    public id!: bigint;
    public nome!: string;
    public data_criacao!: Date;
}

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
    sequelize: database,
    timestamps: false
});

