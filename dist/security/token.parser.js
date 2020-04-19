"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const pessoas_model_1 = require("../modelRouter/pessoas/pessoas.model");
const environment_1 = require("../commom/environment");
exports.tokenParser = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
function extractToken(req) {
    // Authorization: Bearer TOKEN
    let token = undefined;
    const authorization = req.header('authorization');
    if (authorization) {
        const parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            pessoas_model_1.Pessoa.findByEmail(decoded.sub).then(user => {
                if (user) {
                    // Associar o usuário no request
                    req.authenticated = user;
                }
                next();
            }).catch(next);
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=token.parser.js.map