
import * as restify from 'restify'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'
import { ModelRouter } from '../../commom/model-router'
import { FluxoCaixa } from './fluxosCaixa.model'

class FluxosCaixaRouter extends ModelRouter<FluxoCaixa> {

    constructor() {
        super(FluxoCaixa)
        this.on('beforeRender', document => {
            document.telefone = undefined // Exemplo alterando um documento antes de exibir.
        })
    }

    applyRoutes(application: restify.Server) {

        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, this.findByPk)
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, this.replace)
        application.patch(`${this.basePath}/:id`, this.update)
        application.del(`${this.basePath}/:id`, this.delete)

    }

}

export const fluxosCaixaRouter = new FluxosCaixaRouter()