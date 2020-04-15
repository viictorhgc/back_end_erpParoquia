"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environment_1 = require("../commom/environment");
exports.database = new sequelize_1.Sequelize({
    username: environment_1.environment.db.db_user,
    password: environment_1.environment.db.db_password,
    host: environment_1.environment.db.db_host,
    port: environment_1.environment.db.db_port,
    database: environment_1.environment.db.db_database,
    dialect: 'postgres'
});
//# sourceMappingURL=conexao.db.js.map