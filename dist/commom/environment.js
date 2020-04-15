"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: {
        db_host: "34.95.132.83",
        db_port: 5432,
        db_user: "postgres",
        db_password: "v3GMhvo135pu6LJo",
        db_database: "db_paroquia",
        db_dialect: 'postgres',
        db_use_timestamp: false
    },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'back-end-api-scret',
        enableHTTPS: process.env.ENABLE_HTTPS || false,
        certificate: process.env.CERT_FILE || '',
        key: process.env.CERT_KEY_FILE || '',
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        name: 'back_end_erpParoquia'
    }
};
//# sourceMappingURL=environment.js.map