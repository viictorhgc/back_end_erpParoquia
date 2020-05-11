"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formasPagamento_model_1 = require("./formasPagamento.model");
const model_router_1 = require("../../commom/model-router");
class FormasPagamentoRouter extends model_router_1.ModelRouter {
    constructor() {
        super(formasPagamento_model_1.FormasPagamento);
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}:id`, this.findByPk);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, this.replace);
        application.patch(`${this.basePath}/:id`, this.update);
        application.del(`${this.basePath}/:id`, this.delete);
    }
}
exports.formasPagamentoRouter = new FormasPagamentoRouter();
//# sourceMappingURL=formasPagamento.router.js.map