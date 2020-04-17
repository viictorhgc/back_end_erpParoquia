import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class ReceitaDespesa extends sequelize.Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public nome!: string;
}

ReceitaDespesa.init({
  id: {
    field: 't004_id_receita_despesa',
    type: sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    field: 't004_no_receita_despesa',
    type: new sequelize.DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  schema: 'erp_paroquia',
  tableName: 't004_receita_despesa',
  sequelize: database,
  timestamps: false
});
