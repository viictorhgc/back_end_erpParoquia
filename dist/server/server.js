"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const fs = require("fs");
const environment_1 = require("../commom/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
const token_parser_1 = require("../security/token.parser");
const logger_1 = require("../commom/logger");
const corsMiddleware = require("restify-cors-middleware");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                const options = {
                    name: 'back_end_ErpParoquia',
                    version: '1.0.0',
                    log: logger_1.logger
                };
                if (environment_1.environment.security.enableHTTPS) {
                    options.certificate = fs.readFileSync(environment_1.environment.security.certificate),
                        options.key = fs.readFileSync(environment_1.environment.security.key);
                }
                this.application = restify.createServer(options);
                this.application.pre(restify.plugins.requestLogger({
                    log: logger_1.logger
                }));
                /** Parte dedicada ao CORS */
                const cors = corsMiddleware({
                    preflightMaxAge: 5,
                    origins: ['*'],
                    allowHeaders: ['API-Token'],
                    exposeHeaders: ['API-Token-Expiry']
                });
                this.application.pre(cors.preflight);
                /** FIM CORS */
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.use(token_parser_1.tokenParser);
                // Rotas
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.handleError);
                // (req, resp, route, error)/
                /*
                this.application.on('after', restify.plugins.auditLogger({
                    log: logger,
                    event: 'after',
                    body: true,
                    server: this.application
                }))

                this.application.on('audit', data=>{

                })*/
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initRoutes(routers).then(() => this);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map