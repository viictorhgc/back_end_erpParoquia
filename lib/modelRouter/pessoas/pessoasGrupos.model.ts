import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'

export class PessoaGrupo extends sequelize.Model {
    public id_pessoa!: bigint; // Note that the `null assertion` `!` is required in strict mode.
    public id_grupo!: bigint;
    public data_inclusao!: Date; // for nullable fields
    public data_remocao!: Date;
  }
  
  PessoaGrupo.init({
    PessoaId: {
      field: 't001_id_pessoa',
      type: sequelize.DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    GrupoId: {
      field: 't002_id_grupo',
      type: new sequelize.DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    data_inclusao: {
      field: 't003_dt_inclusao',
      type: new sequelize.DataTypes.DATE,
      allowNull: false
    },
    data_remocao: {
      field: 't003_dt_remocao',
      type: new sequelize.DataTypes.DATE,
      allowNull: true
    }
  }, {
    schema: 'erp_paroquia',
    tableName: 't003_pessoa_grupo',
    sequelize: database,
    timestamps: false
  });
  