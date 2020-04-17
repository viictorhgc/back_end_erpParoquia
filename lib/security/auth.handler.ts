import * as restify from 'restify'
import * as jwt from 'jsonwebtoken'

import {NotAuthorizedError} from 'restify-errors'
import { Pessoa } from '../modelRouter/pessoas/pessoas.model'
import { environment } from '../commom/environment'

export const authenticate: restify.RequestHandler = (req, resp, next) =>{
    const {email, senha} = req.body
    Pessoa.findByEmail(req.body)
        .then(user => {
            console.log("Ai tem que vir pra ca")
            console.log(user)
            console.log(user.senha)
            if(user && user.validPassword(user.senha)){
                const token = jwt.sign({sub: user.email, iss: 'meat-api'}, 
                    environment.security.apiSecret)
                resp.json({name: user.name, email: user.email, accessToken: token})
                return next(false)
            } else {
                return next(new NotAuthorizedError('Invalid Credentials'))
            }
        }).catch(next)
}