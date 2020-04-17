"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Campanhas_model_1 = require("../Campanhas/Campanhas.model");
const model_router_1 = require("../../commom/model-router");
class CampanhasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(Campanhas_model_1.Campanha);
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
exports.campanhasRouter = new CampanhasRouter();
//# sourceMappingURL=campanhas.router.js.map