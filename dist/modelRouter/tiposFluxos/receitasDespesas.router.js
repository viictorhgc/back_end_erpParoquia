"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const receitasDespesas_model_1 = require("./receitasDespesas.model");
const model_router_1 = require("../../commom/model-router");
class TiposFluxosRouter extends model_router_1.ModelRouter {
    constructor() {
        super(receitasDespesas_model_1.TipoFluxo);
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
exports.tiposFluxosRouter = new TiposFluxosRouter();
//# sourceMappingURL=receitasDespesas.router.js.map