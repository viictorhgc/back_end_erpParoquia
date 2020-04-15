import { Server }  from './server/server'
import { pessoasRouter } from './modelRouter/pessoas/pessoas.router'
import { gruposRouter } from './modelRouter/grupos/grupos.router'
import { campanhasRouter } from './modelRouter/campanhas/campanhas.router'
import { pastoraisRouter } from './modelRouter/pastorais/pastorais.router'

const server = new Server()
server.bootstrap([
    pessoasRouter,
    gruposRouter,
    campanhasRouter,
    pastoraisRouter

]).then( server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error=> {
    console.log('Servidor falhou ao iniciar.')
    console.log(error)
    process.exit(1)
})

