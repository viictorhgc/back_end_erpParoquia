
import * as restify from 'restify'
import { Pessoa } from './pessoas.model'
import { authenticate } from '../../security/auth.handler'
import { authorize } from '../../security/authz.handler'
import { ModelRouter } from '../../commom/model-router'
import { tiposFluxosRouter } from '../tiposFluxos/tiposFluxos.router'
import { Op } from 'sequelize'

class PessoasRouter extends ModelRouter<Pessoa> {

    constructor() {
        super(Pessoa)
        this.on('beforeRender', document => {
            document.senha = undefined // Exemplo alterando um documento antes de exibir.
        })
    }

    buscaPessoaPorCPF = (req, resp, next) => {
        this.model.findOne({ where: { cpf: req.params.cpf } })
            .then(this.render(resp, next))
            .catch(next)
    }

    buscaPessoaPorNome = (req, resp, next) => {
        this.model.findAll({ where: { nome: { [Op.iLike]: '%' + req.params.nome + '%' } } })
            .then(this.renderAll(resp, next, { url: req.url }))
            .catch(next)
    }

    buscaDependentes = (req, resp, next) => {
        this.model.findAll({ where: { responsavelId: req.params.id } })
            .then(this.renderAll(resp, next))
            .catch(next)
    }

    applyRoutes(application: restify.Server) {

        //application.get(`${this.basePath}`, [authorize('PADRE'), this.findAllPaginado])
        application.get(`${this.basePath}/:id`, this.findByPk)
        application.get(`${this.basePath}`, this.findAllPaginado)
        application.get(`${this.basePath}/nome/:nome`, this.buscaPessoaPorNome) // Pesquisa por nome
        application.get(`${this.basePath}/cpf/:cpf`, this.buscaPessoaPorCPF) // Pesquisa por CPF
        application.get(`${this.basePath}/dependentes/:id`, this.buscaDependentes) // Busca dependentes
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, this.replace)
        application.patch(`${this.basePath}/:id`, this.update)
        application.del(`${this.basePath}/:id`, this.delete)

        application.post('/autenticar', authenticate)

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