import * as restify from 'restify'

import {ForbiddenError} from 'restify-errors'

export const authorize: (...profiles: string[])=> restify.RequestHandler = (...profiles)=>{
    return async (req, resp, next)=>{

        let grupos = [];
        await req.authenticated.getGrupos().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            grupos.push(roles[i].nome);
          }
        }).catch(next)
        
        let autorizado = profiles.some(profile => grupos.indexOf(profile)!== -1)

        if(req.authenticated !== undefined && autorizado){
            req.log.debug(
                'User %s is authorized with profiles %j on route %s. Required profiles: %j',
                    req.authenticated.id, 
                    grupos,
                    req.path()
            )
            next()
        } else {
            if(req.authenticated){
                req.log.debug(
                    'Permission denied for %s. Required profiles: %j. User profiles: %j',
                        req.authenticated.id, profiles, grupos
                )
            }            
            next(new ForbiddenError('Permission denied'))            
        }
    }
}