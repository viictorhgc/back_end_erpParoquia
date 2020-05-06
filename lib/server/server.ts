import * as restify from 'restify'
import * as fs from 'fs'

import { environment } from '../commom/environment'
import { Router } from '../commom/router'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.handler'
import { tokenParser } from '../security/token.parser'
import { logger } from '../commom/logger'
import * as corsMiddleware from 'restify-cors-middleware'


export class Server {

    application: restify.Server
 
    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                const options: restify.ServerOptions = {
                    name: 'back_end_ErpParoquia',
                    version: '1.0.0',
                    log: logger
                }

                if (environment.security.enableHTTPS) {
                    options.certificate = fs.readFileSync(environment.security.certificate),
                        options.key = fs.readFileSync(environment.security.key)
                }

                this.application = restify.createServer(options)

                this.application.pre(restify.plugins.requestLogger({
                    log: logger
                }))

                /** Parte dedicada ao CORS */
                const cors = corsMiddleware({
                    preflightMaxAge: 5, //Optional
                    origins: ['*'],
                    allowHeaders: ['API-Token'],
                    exposeHeaders: ['API-Token-Expiry']
                  })
                   
                this.application.pre(cors.preflight)

                /** FIM CORS */
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
                this.application.use(tokenParser)

                // Rotas
                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

                this.application.on('restifyError', handleError)

                // (req, resp, route, error)/
                /*
                this.application.on('after', restify.plugins.auditLogger({
                    log: logger,
                    event: 'after',
                    body: true,
                    server: this.application
                }))

                this.application.on('audit', data=>{

                })*/

            } catch (error) {
                reject(error)
            }
        })
    }

    bootstrap(routers: any[] = []): Promise<Server> {
        return this.initRoutes(routers).then(() => this)
    }
}