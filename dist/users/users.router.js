"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document=>{
            document.password = undefined
        })
    }

    findByEmail = (req,resp,next)=> {
        if(req.query.email){
            User.findByEmail(req.query.email)
            .then(user => {
              if(user) {
                  return [user]
              } else {
                  return []
              }
            })
            .then(this.renderAll(resp,next))
            .catch(next)
        } else {
            next()
        }
    }
    applyRoutes(application: restify.Server){

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
    }

}

export const usersRouter = new UsersRouter ()

*/ 
//# sourceMappingURL=users.router.js.map