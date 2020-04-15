"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environment_1 = require("../commom/environment");
exports.database = new sequelize_1.Sequelize(environment_1.environment.pg_db);
//# sourceMappingURL=conexao_db.js.map