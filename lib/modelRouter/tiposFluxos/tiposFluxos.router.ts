
import * as restify from 'restify'
import { TipoFluxo } from './tiposFluxos.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'
import { ModelRouter } from '../../commom/model-router'

class TiposFluxosRouter extends ModelRouter<TipoFluxo> {

    constructor() {
        super(TipoFluxo)        
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

export const tiposFluxosRouter = new TiposFluxosRouter()