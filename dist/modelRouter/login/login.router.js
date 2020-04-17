"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_model_1 = require("../login/login.model");
const model_router_1 = require("../../commom/model-router");
class LoginsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(login_model_1.Login);
        this.on('beforeRender', document => {
            document.senha = undefined; // Retirando a senha antes de renderizar
        });
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, this.findByPk);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, this.replace);
        application.patch(`${this.basePath}/:id`, this.update);
        application.del(`${this.basePath}/:id`, this.delete);
    }
}
exports.loginsRouter = new LoginsRouter();
//# sourceMappingURL=login.router.js.map