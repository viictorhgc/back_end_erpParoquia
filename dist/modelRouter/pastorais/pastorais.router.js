"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pastorais_model_1 = require("../pastorais/pastorais.model");
const model_router_1 = require("../../commom/model-router");
class PastoraisRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pastorais_model_1.Pastoral);
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
exports.pastoraisRouter = new PastoraisRouter();
//# sourceMappingURL=pastorais.router.js.map