"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3001 },
    db: {
        db_host: process.env.DB_HOST || "34.95.132.83",
        db_port: 5432,
        db_user: process.env.DB_USER || "postgres",
        db_password: process.env.DB_PASSWORD || "v3GMhvo135pu6LJo",
        db_database: process.env.DB_DATABASE || "db_paroquia",
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