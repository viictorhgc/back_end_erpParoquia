
import * as restify from 'restify'
import { Pessoa,  Pessoa_Grupo } from '../pessoas/pessoas.model'
import { Grupo } from '../grupos/grupos.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'

class GruposRouter {

    applyRoutes(application: restify.Server) {

        application.get('/grupo', (req, resp, next) => {
            Grupo.findAll().then(data => {
                resp.send(200, data);
            }).catch(next)
        })

        application.get('/grupo/:id', (req, resp, next) => {
            Grupo.findByPk<Grupo>(req.params.id)
            .then((Grupo: Grupo | null) => {
                if (Grupo) {
                    resp.send(200, Grupo)
                } else {
                    resp.send(404, { errors: ["Grupo não encontrado"] })
                }
            }).catch(next)
        })

    }
}  

export const gruposRouter = new GruposRouter()