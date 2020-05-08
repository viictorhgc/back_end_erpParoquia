import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'
import { Pessoa } from '../pessoas/pessoas.model'
import { ReceitaDespesa } from '../receitasDespesas/receitasDespesas.model';

export class FluxoCaixa extends sequelize.Model {
  public id!: bigint; // Note that the `null assertion` `!` is required in strict mode.
  public pagadorId!: bigint;
  public receptorId: bigint;
  public receitaDespesaId: number;
  public data_efetivacao!: bigint;
  public valor: number;
}

FluxoCaixa.init({
  id: {
    field: 't005_id_fluxo_caixa',
    type: sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  pagadorId: {
    field: 't001_id_pagador',
    type: new sequelize.DataTypes.BIGINT,
    allowNull: true,
  },
  receptorId: {
    field: 't001_id_receptor',
    type: new sequelize.DataTypes.BIGINT,
    allowNull: false,
  },
  receitaDespesaId: {
    field: 't004_id_receita_despesa',
    type: new sequelize.DataTypes.INTEGER,
    allowNull: false,
  },
  data_efetivacao: {
    field: 't005_dt_efetivacao',
    type: new sequelize.DataTypes.DATE,
    allowNull: true,
  },
  valor: {
    field: 't005_valor',
    type: new sequelize.DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  schema: 'erp_paroquia',
  tableName: 't005_fluxo_caixa',
  sequelize: database,
  timestamps: false
});

FluxoCaixa.belongsTo(Pessoa, { as: 'Pagador', foreignKey: 'pagadorId' })
FluxoCaixa.belongsTo(Pessoa, { as: 'Receptor', foreignKey: 'receptorId' })
FluxoCaixa.belongsTo(ReceitaDespesa, {foreignKey: 'receitaDespesaId'})
