"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pessoas_model_1 = require("./pessoas.model");
const auth_handler_1 = require("../../security/auth.handler");
const model_router_1 = require("../../commom/model-router");
const sequelize_1 = require("sequelize");
class PessoasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pessoas_model_1.Pessoa);
        this.buscaPessoaPorCPF = (req, resp, next) => {
            this.model.findOne({ where: { cpf: req.params.cpf } })
                .then(this.render(resp, next))
                .catch(next);
        };
        this.buscaPessoaPorNome = (req, resp, next) => {
            this.model.findAll({ where: { nome: { [sequelize_1.Op.iLike]: '%' + req.params.nome + '%' } } })
                .then(this.renderAll(resp, next, { url: req.url }))
                .catch(next);
        };
        this.buscaDependentes = (req, resp, next) => {
            this.model.findAll({ where: { responsavelId: req.params.id } })
                .then(this.renderAll(resp, next))
                .catch(next);
        };
        this.on('beforeRender', document => {
            document.senha = undefined; // Exemplo alterando um documento antes de exibir.
        });
    }
    applyRoutes(application) {
        //application.get(`${this.basePath}`, [authorize('PADRE'), this.findAllPaginado])
        application.get(`${this.basePath}/:id`, this.findByPk);
        application.get(`${this.basePath}`, this.findAllPaginado);
        application.get(`${this.basePath}/nome/:nome`, this.buscaPessoaPorNome); // Pesquisa por nome
        application.get(`${this.basePath}/cpf/:cpf`, this.buscaPessoaPorCPF); // Pesquisa por CPF
        application.get(`${this.basePath}/dependentes/:id`, this.buscaDependentes); // Busca dependentes
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, this.replace);
        application.patch(`${this.basePath}/:id`, this.update);
        application.del(`${this.basePath}/:id`, this.delete);
        application.post('/autenticar', auth_handler_1.authenticate);
    }
}
exports.pessoasRouter = new PessoasRouter();
//# sourceMappingURL=pessoas.router.js.map