"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../commom/model-router");
const fluxosCaixa_model_1 = require("./fluxosCaixa.model");
const pessoas_model_1 = require("../pessoas/pessoas.model");
const receitasDespesas_model_1 = require("../receitasDespesas/receitasDespesas.model");
class FluxosCaixaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(fluxosCaixa_model_1.FluxoCaixa);
        this.findDizimosbyIdPessoa = (req, resp, next) => {
            this.model.findAll({
                where: {
                    pagadorId: req.params.id
                },
                include: [{ model: pessoas_model_1.Pessoa, as: 'Pagador' }, { model: pessoas_model_1.Pessoa, as: 'Receptor' }, { model: receitasDespesas_model_1.ReceitaDespesa }]
            })
                .then(this.renderAll(resp, next, { url: req.url }))
                .catch(next);
        };
        this.on('beforeRender', document => {
            //document.Pagador.senha = undefined,
            //document.Receptor.senha = undefined 
        });
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, this.findByPk);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, this.replace);
        application.patch(`${this.basePath}/:id`, this.update);
        application.del(`${this.basePath}/:id`, this.delete);
        // Dízimos
        application.get(`${this.basePath}/dizimo/pessoa/:id`, this.findDizimosbyIdPessoa);
    }
}
exports.fluxosCaixaRouter = new FluxosCaixaRouter();
//# sourceMappingURL=fluxosCaixa.router.js.map