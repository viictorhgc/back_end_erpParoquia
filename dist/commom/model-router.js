"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const restify_errors_1 = require("restify-errors");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.pageSize = 4;
        this.findByPk = (req, resp, next) => {
            this.model.findByPk(req.params.id)
                .then(this.render(resp, next)).catch(next);
        };
        this.findAll = (req, resp, next) => {
            this.model.findAll().then(this.renderAll(resp, next)).catch(next);
        };
        this.save = (req, resp, next) => {
            let document = new this.model(req.body);
            document.save()
                .then(this.render(resp, next))
                .catch(next);
        };
        this.delete = (req, resp, next) => {
            this.model.destroy({ where: { id: req.params.id } }).then((cmdResult) => {
                if (cmdResult) {
                    resp.send(204, cmdResult);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
                return next();
            })
                .catch(next);
        };
        this.replace = (req, resp, next) => {
            this.model.findByPk(req.params.id)
                .then(dados => {
                if (dados) {
                    dados.update(req.body, { where: { id: req.params.id } })
                        .then(this.render(resp, next))
                        .catch(next);
                }
                else {
                    next(new restify_errors_1.NotFoundError('Não encontrado'));
                }
            }).catch(next);
        };
        this.update = (req, resp, next) => {
            this.model.findByPk(req.params.id)
                .then(dados => {
                if (dados) {
                    dados.update(req.body, { where: { id: req.params.id } })
                        .then(this.render(resp, next))
                        .catch(next);
                }
                else {
                    next(new restify_errors_1.NotFoundError('Não encontrado'));
                }
            }).catch(next);
        };
        this.basePath = `/${model.name.toLowerCase()}`;
    }
    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource.id}`;
        return resource;
    }
}
exports.ModelRouter = ModelRouter;
//# sourceMappingURL=model-router.js.map