"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const restify_errors_1 = require("restify-errors");
const pessoas_model_1 = require("../modelRouter/pessoas/pessoas.model");
const environment_1 = require("../commom/environment");
exports.authenticate = (req, resp, next) => {
    const { email, senha } = req.body;
    pessoas_model_1.Pessoa.findByEmail(email)
        .then(user => {
        if (user && user.validPassword(senha, user.senha)) {
            const token = jwt.sign({ sub: user.email, iss: 'backParoquiaAPI' }, environment_1.environment.security.apiSecret);
            resp.json({ idLogado: user.id, name: user.name, email: user.email, accessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid Credentials'));
        }
    }).catch(next);
};
//# sourceMappingURL=auth.handler.js.map