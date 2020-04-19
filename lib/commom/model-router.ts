import { Router } from './router'
import * as mongoose from 'mongoose'
import { NotFoundError, RequesturiTooLargeError } from 'restify-errors'
import * as Sequelize from 'sequelize'

export abstract class ModelRouter<D extends Sequelize.Model> extends Router {

    basePath: string

    tamanhoPagina: number = 10

    constructor(protected model: Sequelize.ModelCtor<D>) {
        super()
        this.basePath = `/${model.name.toLowerCase()}`

    }

    paginar() {
        // Fetch 10 instances/rows
        this.model.findAll({ limit: 10 });
        // Skip 8 instances/rows
        this.model.findAll({ offset: 8 });
        // Skip 5 instances and fetch the 5 after that
        this.model.findAll({ offset: 5, limit: 5 });
    }

    envelope(document: any): any {
        let resource = Object.assign({ _links: {} }, document.toJSON())
        resource._links.self = `${this.basePath}/${resource.id}`
        return resource
    }

    envelopeAll(documents: any[], options: any = {}): any {
        const resource: any = {
            _links:{
                self: `${options.url}`
            },
            items: documents
        }
        if(options.pagina && options.count && options.pageSize){
            if(options.pagina > 1){
                resource._links.previous = `${this.basePath}?_page=${options.pagina-1}`
            }
            const remaining = options.count - (options.pagina * options.pageSize)
            if (remaining > 0){
                resource._links.next = `${this.basePath}?_page=${options.pagina+1}`
            }            
        }

        return resource
    }

    findAllPaginado = (req, resp, next) => {
        // Busca o número da página, ou se não for informado, retorna 1.
        let pagina = parseInt(req.query._page || 1)

        // Se a página for <= 0, retorna a página 1
        pagina = pagina > 0 ? pagina : 1

        // 
        const skip = (pagina - 1) * this.tamanhoPagina   

        this.model.count()
            .then(count => this.model.findAll({ offset: skip, limit: this.tamanhoPagina, order: [  ['id', 'ASC'] ], })
                .then(this.renderAll(resp, next, { pagina, count, pageSize: this.tamanhoPagina, url: req.url })).catch(next)
            )
    }

    findOne = (req, resp, next) => {
        let document = new this.model(req.body)
        this.model.findOne({ where: req.body })
            .then(this.render(resp, next))
            .catch(next)
    }

    findByPk = (req, resp, next) => {
        this.model.findByPk(req.params.id)
            .then(this.render(resp, next)).catch(next)
    }


    findAll = (req, resp, next) => {
        this.model.findAll().then(this.renderAll(resp, next)).catch(next)
    }

    save = (req, resp, next) => {
        let document = new this.model(req.body)
        document.save()
            .then(this.render(resp, next))
            .catch(next)
    }

    delete = (req, resp, next) => {
        this.model.destroy({ where: { id: req.params.id } }).then(
            (cmdResult: any) => {
                if (cmdResult) {
                    resp.send(204, cmdResult)
                } else {
                    throw new NotFoundError('Documento não encontrado.')
                }
                return next()
            })
            .catch(next)
    }

    replace = (req, resp, next) => {
        this.model.findByPk(req.params.id)
            .then(dados => {
                if (dados) {
                    dados.update(req.body, { where: { id: req.params.id } })
                        .then(this.render(resp, next))
                        .catch(next)
                } else {
                    next(new NotFoundError('Não encontrado'))
                }
            }).catch(next)
    }

    update = (req, resp, next) => {
        this.model.findByPk(req.params.id)
            .then(dados => {
                if (dados) {
                    dados.update(req.body, { where: { id: req.params.id } })
                        .then(this.render(resp, next))
                        .catch(next)
                } else {
                    next(new NotFoundError('Não encontrado'))
                }
            }).catch(next)
    }

}