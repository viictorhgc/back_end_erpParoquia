
import * as restify from 'restify'
import { Pessoa } from './pessoas.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'
import { ModelRouter } from '../../commom/model-router'

class PessoasRouter extends ModelRouter<Pessoa> {

    constructor() {
        super(Pessoa)
        this.on('beforeRender', document => {
            document.senha = undefined // Exemplo alterando um documento antes de exibir.
        })
    } 
    
    /*
    findByEmail = (req,resp,next)=> {
        if(req.body.email){
            console.log("Danado ta aqui")
            Pessoa.findOne({where: {email : req.body.email}})
            .then(user => {
                console.log(user)
              if(user) {
                  return [user]
              } else {
                  return []
              }
            })
            .then(this.renderAll(resp,next))
            .catch(next)
        } else {
            throw new Error("Favor preencher o e-mail")
        }
    }*/

    applyRoutes(application: restify.Server) {


        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, this.findByPk)
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, this.replace)
        application.patch(`${this.basePath}/:id`, this.update)
        application.del(`${this.basePath}/:id`, this.delete)

        application.post('/autenticar', authenticate )

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