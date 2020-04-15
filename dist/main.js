"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const pessoas_router_1 = require("./modelRouter/pessoas/pessoas.router");
const grupos_router_1 = require("./modelRouter/grupos/grupos.router");
const server = new server_1.Server();
server.bootstrap([
    pessoas_router_1.pessoasRouter,
    grupos_router_1.gruposRouter
]).then(server => {
    console.log('Server is listening on: ', server.application.address());
}).catch(error => {
    console.log('Servidor falhou ao iniciar.');
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map