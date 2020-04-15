"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Campanhas_model_1 = require("../Campanhas/Campanhas.model");
class CampanhasRouter {
    applyRoutes(application) {
        application.get('/campanha', (req, resp, next) => {
            Campanhas_model_1.Campanha.findAll().then(data => {
                resp.send(200, data);
            }).catch(next);
        });
        application.get('/campanha/:id', (req, resp, next) => {
            Campanhas_model_1.Campanha.findByPk(req.params.id)
                .then((Campanha) => {
                if (Campanha) {
                    resp.send(200, Campanha);
                }
                else {
                    resp.send(404, { errors: ["Campanha não encontrado"] });
                }
            }).catch(next);
        });
    }
}
exports.campanhasRouter = new CampanhasRouter();
//# sourceMappingURL=campanhas.router.js.map