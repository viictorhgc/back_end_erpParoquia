"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pastorais_model_1 = require("../pastorais/pastorais.model");
class PastoraisRouter {
    applyRoutes(application) {
        application.get('/pastoral', (req, resp, next) => {
            pastorais_model_1.Pastoral.findAll().then(data => {
                resp.send(200, data);
            }).catch(next);
        });
        application.get('/pastoral/:id', (req, resp, next) => {
            pastorais_model_1.Pastoral.findByPk(req.params.id)
                .then((Pastoral) => {
                if (Pastoral) {
                    resp.send(200, Pastoral);
                }
                else {
                    resp.send(404, { errors: ["Pastoral não encontrado"] });
                }
            }).catch(next);
        });
    }
}
exports.pastoraisRouter = new PastoraisRouter();
//# sourceMappingURL=pastorais.router.js.map