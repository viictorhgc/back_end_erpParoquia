
import * as restify from 'restify'
import { Campanha } from '../campanhas/campanhas.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'
import { ModelRouter } from '../../commom/model-router'

class CampanhasRouter extends ModelRouter <Campanha> {

    constructor() {
        super(Campanha)
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

export const campanhasRouter = new CampanhasRouter()