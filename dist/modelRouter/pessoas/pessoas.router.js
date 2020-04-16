"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pessoas_model_1 = require("./pessoas.model");
const model_router_1 = require("../../commom/model-router");
class PessoasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pessoas_model_1.Pessoa);
        this.on('beforeRender', document => {
            document.telefone = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/pessoa', this.findAll);
        application.get('/pessoa/:id', this.findByPk);
        application.post(`${this.basePath}`, this.save);
        //application.put(`${this.basePath}/:id`, this.replace)
        //application.patch(`${this.basePath}/:id`,this.validateId,this.update])
        application.del(`${this.basePath}/:id`, this.delete);
    }
}
exports.pessoasRouter = new PessoasRouter();
//# sourceMappingURL=pessoas.router.js.map