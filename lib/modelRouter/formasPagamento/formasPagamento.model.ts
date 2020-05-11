import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class FormasPagamento extends sequelize.Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public nome!: string;
}

FormasPagamento.init({
  id: {
    field: 'id_fpg_forma_pagamento',
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    field: 'nome_fpg_forma_pagamento',
    type: new sequelize.DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  schema: 'erp_paroquia',
  tableName: 'tb_fpg_forma_pagamento',
  sequelize: database,
  timestamps: false
});
