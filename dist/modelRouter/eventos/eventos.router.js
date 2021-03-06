"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../commom/model-router");
const eventos_model_1 = require("./eventos.model");
class EventosRouter extends model_router_1.ModelRouter {
    constructor() {
        super(eventos_model_1.Evento);
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
exports.eventosRouter = new EventosRouter();
//# sourceMappingURL=eventos.router.js.map