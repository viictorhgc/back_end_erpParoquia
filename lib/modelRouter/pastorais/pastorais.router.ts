
import * as restify from 'restify'
import { Pastoral } from '../pastorais/pastorais.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'

class PastoraisRouter {

    applyRoutes(application: restify.Server) {

        application.get('/pastoral', (req, resp, next) => {
            Pastoral.findAll().then(data => {
                resp.send(200, data);
            }).catch(next)
        })

        application.get('/pastoral/:id', (req, resp, next) => {
            Pastoral.findByPk<Pastoral>(req.params.id)
            .then((Pastoral: Pastoral | null) => {
                if (Pastoral) {
                    resp.send(200, Pastoral)
                } else {
                    resp.send(404, { errors: ["Pastoral não encontrado"] })
                }
            }).catch(next)
        })

    }
}  

export const pastoraisRouter = new PastoraisRouter()