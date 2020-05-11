import * as sequelize from 'sequelize'
import * as bcrypt from 'bcrypt'
import { database } from '../../server/conexao.db'
import { Grupo } from '../grupos/grupos.model'
import { PessoaGrupo } from './pessoasGrupos.model'
import { environment } from '../../commom/environment'
import { HasManyGetAssociationsMixin } from 'sequelize'

export class Pessoa extends sequelize.Model {
  public id!: bigint; // Note that the `null assertion` `!` is required in strict mode.
  public nome!: string;
  public cpf: string;
  public sexo: string;
  public email: string;
  public dataNascimento!: Date; // for nullable fields
  public endereco!: string;
  public telefone!: string;
  public senha!: string;
  public podeLogar: boolean;

  public getGrupos!: sequelize.HasManyGetAssociationsMixin<Grupo>;

  validPassword(senha) {
    return bcrypt.compareSync(senha, this.senha);
  }

  static findByEmail = function (email: string) {
    return this.findOne({
      include: [{ model: Grupo }],
      where: { email: email }
    })
  }

}

Pessoa.init({
  id: {
    field: 'pes_id_pessoa',
    type: sequelize.DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    field: 'pes_no_pessoa',
    type: new sequelize.DataTypes.STRING(500),
    allowNull: false,
  },
  cpf: {
    field: 'pes_nu_cpf',
    type: new sequelize.DataTypes.STRING(11),
    allowNull: true,
  },
  sexo: {
    field: 'pes_tp_sexo',
    type: new sequelize.DataTypes.STRING(1),
    allowNull: false,
  },
  email: {
    field: 'pes_ds_email',
    type: new sequelize.DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Favor inserir um e-mail válido"
      }
    }
  },
  dataNascimento: {
    field: 'pes_dt_nascimento',
    type: new sequelize.DataTypes.DATEONLY,
    allowNull: false
  },
  endereco: {
    field: 'pes_ds_endereco',
    type: new sequelize.DataTypes.STRING(1000),
    allowNull: false
  },
  telefone: {
    field: 'pes_ds_telefone',
    type: new sequelize.DataTypes.STRING(20),
    allowNull: false
  },
  senha: {
    field: 'pes_hash_senha',
    type: new sequelize.DataTypes.STRING,
    allowNull: true
  },
  podeLogar: {
    field: 'pes_is_login',
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
  tableName: 'tb_pes_pessoa',
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
    if (pessoa.senha) {
      return bcrypt.hash(pessoa.senha, environment.security.saltRounds)
        .then(hash => {
          pessoa.senha = hash;
        })
        .catch(err => {
          throw new Error(err);
        })
    } else {
      throw new Error("A senha deve ser preenchida quando a pessoa tiver o login habilitado");
    }
  } else {
    // Limpa a senha caso o usuário não possa fazer login
    pessoa.senha = undefined
  }
});
