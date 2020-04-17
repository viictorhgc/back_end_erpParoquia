import * as sequelize from 'sequelize';
import { database } from '../../server/conexao.db'
import { Grupo } from '../grupos/grupos.model'

export class Pessoa extends sequelize.Model {
  public id!: bigint; // Note that the `null assertion` `!` is required in strict mode.
  public nome!: string;
  public data_nascimento!: Date; // for nullable fields
  public endereco!: string;
  public telefone!: string;
  /*
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.

  public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Project, number>;
  public hasProject!: HasManyHasAssociationMixin<Project, number>;
  public countProjects!: HasManyCountAssociationsMixin;
  public createProject!: HasManyCreateAssociationMixin<Project>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    projects: Association<User, Project>;
  };
  */
}

Pessoa.init({
  id: {
    field: 't001_id_pessoa',
    type: sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    field: 't001_no_pessoa',
    type: new sequelize.DataTypes.STRING(500),
    allowNull: false,
  },
  data_nascimento: {
    field: 't001_dt_nascimento',
    type: new sequelize.DataTypes.DATEONLY,
    allowNull: false
  },
  endereco: {
    field: 't001_de_endereco',
    type: new sequelize.DataTypes.STRING(1000),
    allowNull: false
  },
  telefone: {
    field: 't001_de_telefone',
    type: new sequelize.DataTypes.STRING(20),
    allowNull: false
  }
}, {
  schema: 'erp_paroquia',
  tableName: 't001_pessoa',
  sequelize: database,
  timestamps: false
});

export class Pessoa_Grupo extends sequelize.Model {
  public id_pessoa!: bigint; // Note that the `null assertion` `!` is required in strict mode.
  public id_grupo!: bigint;
  public data_inclusao!: Date; // for nullable fields
  public data_remocao!: Date;
}

Pessoa_Grupo.init({
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

//Manter a relação sempre no mesmo arquivo.

Pessoa.belongsToMany(Grupo, { through: Pessoa_Grupo });
Grupo.belongsToMany(Pessoa, { through: Pessoa_Grupo });
