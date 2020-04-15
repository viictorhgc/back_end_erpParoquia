"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const pessoas_router_1 = require("./modelRouter/pessoas/pessoas.router");
const grupos_router_1 = require("./modelRouter/grupos/grupos.router");
const campanhas_router_1 = require("./modelRouter/campanhas/campanhas.router");
const pastorais_router_1 = require("./modelRouter/pastorais/pastorais.router");
const server = new server_1.Server();
server.bootstrap([
    pessoas_router_1.pessoasRouter,
    grupos_router_1.gruposRouter,
    campanhas_router_1.campanhasRouter,
    pastorais_router_1.pastoraisRouter
]).then(server => {
    console.log('Server is listening on: ', server.application.address());
}).catch(error => {
    console.log('Servidor falhou ao iniciar.');
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map