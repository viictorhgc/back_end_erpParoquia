"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grupos_model_1 = require("../grupos/grupos.model");
class GruposRouter {
    applyRoutes(application) {
        application.get('/grupo', (req, resp, next) => {
            grupos_model_1.Grupo.findAll().then(data => {
                resp.send(200, data);
            }).catch(next);
        });
        application.get('/grupo/:id', (req, resp, next) => {
            grupos_model_1.Grupo.findByPk(req.params.id)
                .then((Grupo) => {
                if (Grupo) {
                    resp.send(200, Grupo);
                }
                else {
                    resp.send(404, { errors: ["Grupo não encontrado"] });
                }
            }).catch(next);
        });
    }
}
exports.gruposRouter = new GruposRouter();
//# sourceMappingURL=grupos.router.js.map