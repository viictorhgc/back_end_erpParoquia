"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
exports.authorize = (...profiles) => {
    return (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
        let grupos = [];
        yield req.authenticated.getGrupos().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                grupos.push(roles[i].nome);
            }
        }).catch(next);
        let autorizado = profiles.some(profile => grupos.indexOf(profile) !== -1);
        if (req.authenticated !== undefined && autorizado) {
            req.log.debug('User %s is authorized with profiles %j on route %s. Required profiles: %j', req.authenticated.id, grupos, req.path());
            next();
        }
        else {
            if (req.authenticated) {
                req.log.debug('Permission denied for %s. Required profiles: %j. User profiles: %j', req.authenticated.id, profiles, grupos);
            }
            next(new restify_errors_1.ForbiddenError('Permission denied'));
        }
    });
};
//# sourceMappingURL=authz.handler.js.map