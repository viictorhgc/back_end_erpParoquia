"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const environment_1 = require("../../commom/environment");
const conexao_db_1 = require("../../server/conexao.db");
class Login extends sequelize.Model {
}
exports.Login = Login;
Login.init({
    id: {
        field: 't000_id_login',
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    senha: {
        field: 't000_senha',
        type: new sequelize.DataTypes.STRING,
        allowNull: false
    },
    dataUltimoLogin: {
        field: 't000_dt_ultimo_login',
        type: new sequelize.DataTypes.DATE,
        allowNull: false
    },
    pessoaId: {
        field: 't001_id_pessoa',
        type: new sequelize.DataTypes.BIGINT,
        allowNull: false
    }
}, {
    schema: 'erp_paroquia',
    tableName: 't000_login',
    sequelize: conexao_db_1.database,
    timestamps: false,
    hooks: {
        beforeSave: (login) => {
            login.senha = bcrypt.hash(login.senha, environment_1.environment.security.saltRounds);
        }
    }
});
// Relacionamento
//Login.belongsTo(Pessoa)
const matches = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.senha, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.senha = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const login = this;
    // Verificar se a senha foi alterada 
    //login.changed("senha")
    hashPassword(login, next);
};
const updateMiddleware = function (next) {
    const login = this;
    hashPassword(login, next);
    /*  Verificar se a senha foi alterada
    
    if(!this.getUpdate().password){
        next()
    } else {
        hashPassword(this.getUpdate(),next)
    }
    */
};
//# sourceMappingURL=login.model.js.map