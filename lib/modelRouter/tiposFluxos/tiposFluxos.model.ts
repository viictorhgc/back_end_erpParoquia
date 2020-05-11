import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class TipoFluxo extends sequelize.Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public nome: string;
  public descricao: string;
}

TipoFluxo.init({
  id: {
    field: 'tfx_id_tipo_fluxo',
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    field: 'tfx_no_tipo_fluxo',
    type: new sequelize.DataTypes.STRING(255),
    allowNull: false,
  },
  descricao: {
    field: 'tfx_ds_tipo_fluxo',
    type: new sequelize.DataTypes.STRING(500),
    allowNull: false,
  }
}, {
  schema: 'erp_paroquia',
  tableName: 'tb_tfx_tipo_fluxo',
  sequelize: database,
  timestamps: false
});

