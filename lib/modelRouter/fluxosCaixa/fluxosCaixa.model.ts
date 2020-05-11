import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'
import { Pessoa } from '../pessoas/pessoas.model'
import { TipoFluxo } from '../tiposFluxos/tiposFluxos.model';
import { FormasPagamento } from '../formasPagamento/formasPagamento.model';

export class FluxoCaixa extends sequelize.Model {
  public id!: bigint; // Note that the `null assertion` `!` is required in strict mode.
  public pagadorId!: bigint;
  public receptorId: bigint;
  public tipoFluxoId: number;
  public data_efetivacao!: bigint;
  public valor: number;
}

FluxoCaixa.init({
  id: {
    field: 'fcx_id_fluxo_caixa',
    type: sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  pagadorId: {
    field: 'pes_id_pagador',
    type: new sequelize.DataTypes.BIGINT,
    allowNull: true,
  },
  receptorId: {
    field: 'pes_id_receptor',
    type: new sequelize.DataTypes.BIGINT,
    allowNull: false,
  },
  tipoFluxoId: {
    field: 'tfx_id_tipo_fluxo',
    type: new sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  formaPagamentoId: {
    field: 'fpg_id_forma_pagamento',
    type: new sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  data_efetivacao: {
    field: 'fcx_dt_efetivacao',
    type: new sequelize.DataTypes.DATE,
    allowNull: true,
  },
  valor: {
    field: 'fcx_valor',
    type: new sequelize.DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  schema: 'erp_paroquia',
  tableName: 'tb_fcx_fluxo_caixa',
  sequelize: database,
  timestamps: false
});

FluxoCaixa.belongsTo(Pessoa, { as: 'Pagador', foreignKey: 'pagadorId' })
FluxoCaixa.belongsTo(Pessoa, { as: 'Receptor', foreignKey: 'receptorId' })
FluxoCaixa.belongsTo(TipoFluxo, {foreignKey: 'tipoFluxoId'})
FluxoCaixa.belongsTo(FormasPagamento, {foreignKey: 'formaPagamentoId'})