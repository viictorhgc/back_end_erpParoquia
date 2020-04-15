import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'
import { Pessoa, Pessoa_Grupo } from '../pessoas/pessoas.model'

export class Grupo extends sequelize.Model {
    public id!: bigint;
    public nome!: string;
    public data_criacao!: Date;
    public ativo!: boolean;
}

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
    sequelize: database,
    timestamps: false
});

