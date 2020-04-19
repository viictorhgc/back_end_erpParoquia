import * as sequelize from 'sequelize'
import * as bcrypt from 'bcrypt'
import { database } from '../../server/conexao.db'
import { Grupo } from '../grupos/grupos.model'
import { PessoaGrupo } from './pessoasGrupos.model'
import { environment } from '../../commom/environment'
import { Sequelize } from 'sequelize'

export class Pessoa extends sequelize.Model {
  public id!: bigint; // Note that the `null assertion` `!` is required in strict mode.
  public nome!: string;
  public email: string;
  public dataNascimento!: Date; // for nullable fields
  public endereco!: string;
  public telefone!: string;
  public senha!: string;
  public podeLogar: boolean;

  public getGrupos!: sequelize.HasManyGetAssociationsMixin<Grupo>;
 
  validPassword(senha){
    return bcrypt.compareSync(senha, this.senha);
  }
  
  static findByEmail = function(email: string){
    return this.findOne( { 
      include: [{model: Grupo}],
      where : {email : email}
    }) 
}

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
  // Nomenclatura
  // https://blog.fabianobento.com.br/2011/09/padroes-para-nomenclatura-em-um-banco-de-dados/
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
  email: {
    field: 't001_ds_email',
    type: new sequelize.DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Favor inserir um e-mail válido" 
      }
    }
  },
  dataNascimento: {
    field: 't001_dt_nascimento',
    type: new sequelize.DataTypes.DATEONLY,
    allowNull: false
  },
  endereco: {
    field: 't001_ds_endereco',
    type: new sequelize.DataTypes.STRING(1000),
    allowNull: false
  },
  telefone: {
    field: 't001_ds_telefone',
    type: new sequelize.DataTypes.STRING(20),
    allowNull: false
  },
  senha: {
    field: 't001_hash_senha',
    type: new sequelize.DataTypes.STRING,
    allowNull: true
  },
  podeLogar: {
    field: 't001_is_login',
    type: new sequelize.DataTypes.TINYINT,
    allowNull: true,
    validate: {
      isIn: {
        args: [['0', '1']],
        msg: "Favor preencher com um valor booleano"
      }
    }
  }
}, {
  schema: 'erp_paroquia',
  tableName: 't001_pessoa',
  sequelize: database,
  timestamps: false,
  modelName: "Pessoa"
});

//Manter a relação sempre no mesmo arquivo.
Pessoa.belongsToMany(Grupo, { through: PessoaGrupo });
Grupo.belongsToMany(Pessoa, { through: PessoaGrupo });

// Criptografando senha
Pessoa.beforeCreate((pessoa, options) => {
  if (pessoa.podeLogar) {
    console.log(pessoa.senha)
    if (pessoa.senha){
      return bcrypt.hash(pessoa.senha, environment.security.saltRounds)
        .then(hash => {
          pessoa.senha = hash;
        })
        .catch(err => {
          throw new Error(err);
        })
    } else {
      throw new Error ("A senha deve ser preenchida quando a pessoa tiver o login habilitado");      
    }
  } else {
    // Limpa a senha caso o usuário não possa fazer login
    pessoa.senha = undefined
  }
});
