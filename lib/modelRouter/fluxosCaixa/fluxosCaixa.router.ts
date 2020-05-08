
import * as restify from 'restify'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'
import { ModelRouter } from '../../commom/model-router'
import { FluxoCaixa } from './fluxosCaixa.model'
import { Pessoa } from '../pessoas/pessoas.model'
import { ReceitaDespesa } from '../receitasDespesas/receitasDespesas.model';

class FluxosCaixaRouter extends ModelRouter<FluxoCaixa> {

    constructor() {
        super(FluxoCaixa)
        this.on('beforeRender', document => {
            document.Pagador.senha = undefined,
            document.Receptor.senha = undefined 
        })
    }

    findDizimosbyIdPessoa = (req, resp, next) => {
        this.model.findAll({
            where: {
                pagadorId: req.params.id
            },
            include: [{ model: Pessoa , as: 'Pagador'},{ model: Pessoa , as: 'Receptor'}, {model: ReceitaDespesa}]
        })
            .then(this.renderAll(resp, next, { url: req.url }))
            .catch(next)
    }

    applyRoutes(application: restify.Server) {

        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, this.findByPk)
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, this.replace)
        application.patch(`${this.basePath}/:id`, this.update)
        application.del(`${this.basePath}/:id`, this.delete)

        // Dízimos
        application.get(`${this.basePath}/dizimo/pessoa/:id`, this.findDizimosbyIdPessoa)

    }

}

export const fluxosCaixaRouter = new FluxosCaixaRouter()