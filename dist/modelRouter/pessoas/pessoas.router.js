"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pessoas_model_1 = require("./pessoas.model");
const auth_handler_1 = require("../../security/auth.handler");
const authz_handler_1 = require("../../security/authz.handler");
const model_router_1 = require("../../commom/model-router");
class PessoasRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pessoas_model_1.Pessoa);
        this.on('beforeRender', document => {
            document.senha = undefined; // Exemplo alterando um documento antes de exibir.
        });
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
    applyRoutes(application) {
        application.get(`${this.basePath}`, [authz_handler_1.authorize('PADRE'), this.findAllPaginado]);
        application.get(`${this.basePath}/:id`, this.findByPk);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, this.replace);
        application.patch(`${this.basePath}/:id`, this.update);
        application.del(`${this.basePath}/:id`, this.delete);
        application.post('/autenticar', auth_handler_1.authenticate);
    }
}
exports.pessoasRouter = new PessoasRouter();
//# sourceMappingURL=pessoas.router.js.map