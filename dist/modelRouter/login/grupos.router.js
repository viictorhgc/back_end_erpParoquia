"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grupos_model_1 = require("../grupos/grupos.model");
const model_router_1 = require("../../commom/model-router");
class GruposRouter extends model_router_1.ModelRouter {
    constructor() {
        super(grupos_model_1.Grupo);
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
exports.gruposRouter = new GruposRouter();
//# sourceMappingURL=grupos.router.js.map