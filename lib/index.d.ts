import { Pessoa } from './modelRouter/pessoas/pessoas.model'

declare module 'restify' {
    export interface Request {
        authenticated: Pessoa
    }
}