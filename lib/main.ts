import { Server } from './server/server'
import { eventosRouter } from './modelRouter/eventos/eventos.router'
import { pessoasRouter } from './modelRouter/pessoas/pessoas.router'
import { gruposRouter } from './modelRouter/grupos/grupos.router'
import { campanhasRouter } from './modelRouter/campanhas/campanhas.router'
import { pastoraisRouter } from './modelRouter/pastorais/pastorais.router'
import { tiposFluxosRouter } from './modelRouter/tiposFluxos/tiposFluxos.router'
import { fluxosCaixaRouter } from './modelRouter/fluxosCaixa/fluxosCaixa.router'
import { formasPagamentoRouter } from './modelRouter/formasPagamento/formasPagamento.router'

const server = new Server()
server.bootstrap([
    pessoasRouter,
    gruposRouter,
    campanhasRouter,
    pastoraisRouter,
    eventosRouter,
    tiposFluxosRouter,
    fluxosCaixaRouter,
    formasPagamentoRouter

]).then(server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error => {
    console.log('Servidor falhou ao iniciar.')
    console.log(error)
    process.exit(1)
})

