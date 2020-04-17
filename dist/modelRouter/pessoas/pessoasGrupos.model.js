"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("sequelize");
const conexao_db_1 = require("../../server/conexao.db");
class PessoaGrupo extends sequelize.Model {
}
exports.PessoaGrupo = PessoaGrupo;
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
    sequelize: conexao_db_1.database,
    timestamps: false
});
//# sourceMappingURL=pessoasGrupos.model.js.map