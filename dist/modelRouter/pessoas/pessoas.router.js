"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pessoas_model_1 = require("./pessoas.model");
const grupos_model_1 = require("../grupos/grupos.model");
class PessoasRouter {
    applyRoutes(application) {
        application.get('/pessoa', (req, resp, next) => {
            pessoas_model_1.Pessoa.findAll({
                include: [grupos_model_1.Grupo]
            }).then(data => {
                resp.send(200, data);
            }).catch(next);
        });
        application.get('/pessoa/:id', (req, resp, next) => {
            pessoas_model_1.Pessoa.findByPk(req.params.id)
                .then((Pessoa) => {
                if (Pessoa) {
                    resp.send(200, Pessoa);
                }
                else {
                    resp.send(404, { errors: ["Pessoa não encontrada"] });
                }
            }).catch(next);
        });
    }
}
exports.pessoasRouter = new PessoasRouter();
//# sourceMappingURL=pessoas.router.js.map