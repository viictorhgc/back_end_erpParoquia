"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../commom/validators");
const bcrypt = require("bcrypt");
const environment_1 = require("../commom/environment");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    },
    profiles: {
        type: [String],
        required: false
    }
});
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection); // {email: email}
};
userSchema.methods.matches = function (password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.hasAny = function (...profiles) {
    return profiles.some(profile => this.profiles.indexOf(profile) !== -1);
};
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
userSchema.pre('update', updateMiddleware);
exports.User = mongoose.model('User', userSchema);
/*
const users = [
    {id: '1', name: 'Peter Parker', email: 'peter@marvel.com'},
    {id: '2', name: 'Bruce Wayne', email: 'bruce@dc.com'}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users)
    }

    static findById(id: string): Promise<any> {
        return new Promise(resolve => {
            const filtered = users.filter(user=> user.id === id)
            let user = undefined
            if(filtered.length > 0){
                user = filtered[0]
            }
            resolve(user)
        })
    }
}*/ 
//# sourceMappingURL=users.model.js.map