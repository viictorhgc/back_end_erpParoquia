"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../commom/model-router");
const fluxosCaixa_model_1 = require("./fluxosCaixa.model");
class FluxosCaixaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(fluxosCaixa_model_1.FluxoCaixa);
        this.on('beforeRender', document => {
            document.telefone = undefined; // Exemplo alterando um documento antes de exibir.
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
exports.fluxosCaixaRouter = new FluxosCaixaRouter();
//# sourceMappingURL=fluxosCaixa.router.js.map