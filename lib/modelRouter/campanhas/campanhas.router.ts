
import * as restify from 'restify'
import { Campanha } from '../Campanhas/Campanhas.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'

class CampanhasRouter {

    applyRoutes(application: restify.Server) {

        application.get('/campanha', (req, resp, next) => {
            Campanha.findAll().then(data => {
                resp.send(200, data);
            }).catch(next)
        })

        application.get('/campanha/:id', (req, resp, next) => {
            Campanha.findByPk<Campanha>(req.params.id)
            .then((Campanha: Campanha | null) => {
                if (Campanha) {
                    resp.send(200, Campanha)
                } else {
                    resp.send(404, { errors: ["Campanha não encontrado"] })
                }
            }).catch(next)
        })

    }
}  

export const campanhasRouter = new CampanhasRouter()