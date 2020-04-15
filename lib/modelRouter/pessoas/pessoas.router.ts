
import * as restify from 'restify'
import { Pessoa, Pessoa_Grupo } from './pessoas.model'
import { Grupo } from '../grupos/grupos.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'

class PessoasRouter {

    applyRoutes(application: restify.Server) {

        application.get('/pessoa', (req, resp, next) => {
            Pessoa.findAll({
                include: [Grupo]
            }).then(data => {
                resp.send(200, data);
            }).catch(next)
        })

        application.get('/pessoa/:id', (req, resp, next) => {
            Pessoa.findByPk<Pessoa>(req.params.id)
                .then((Pessoa: Pessoa | null) => {
                    if (Pessoa) {
                        resp.send(200, Pessoa)
                    } else {
                        resp.send(404, { errors: ["Pessoa não encontrada"] })
                    }
                }).catch(next)
        })

    }

    /*
    application.get({path:`${this.basePath}`, version: '2.0.0'}, [ 
        authorize('admin'),
        this.findByEmail, 
        this.findAll])        
    application.get({path:`${this.basePath}`, version: '1.0.0'},[authorize('admin'),this.findAll])    
    application.get(`${this.basePath}/:id`, [authorize('admin'),this.validateId, this.findById])
    application.post(`${this.basePath}`, [authorize('admin'),this.save])
    application.put(`${this.basePath}/:id`, [authorize('admin'),this.validateId,this.replace])
    application.patch(`${this.basePath}/:id`, [authorize('admin'),this.validateId,this.update])
    application.del(`${this.basePath}/:id`, [authorize('admin'),this.validateId,this.delete])

    // Autenticação
    application.post(`${this.basePath}/authenticate`, authenticate)
    */
}

export const pessoasRouter = new PessoasRouter()