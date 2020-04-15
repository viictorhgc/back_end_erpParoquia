import * as mongoose from 'mongoose'
import {validateCPF} from '../commom/validators'
import * as bcrypt from 'bcrypt'
import {environment} from '../commom/environment'
import { handleError } from '../server/error.handler'

export interface User extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    cpf: string,
    gender: string,
    profiles: string [],
    matches(password: string): boolean,
    hasAny(...profiles: string []): boolean
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
}

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
            validator: validateCPF ,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    },
    profiles: {
        type: [String],
        required: false
    }

})

userSchema.statics.findByEmail = function(email: string, projection: string){
    return this.findOne({email}, projection) // {email: email}
}

userSchema.methods.matches = function(password: string) : boolean {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.hasAny = function(...profiles: string[]) : boolean {
    return profiles.some(profile => this.profiles.indexOf(profile)!== -1)
}

const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password,environment.security.saltRounds)
    .then(hash=>{
        obj.password = hash
        next()
    }).catch(next)
}

const saveMiddleware = function(next){
    const user: User = this
    if(!user.isModified('password')){
        next()
    } else {
        hashPassword(user,next)
    }
}

const updateMiddleware = function(next){
    if(!this.getUpdate().password){
        next()
    } else {
        hashPassword(this.getUpdate(),next)
    }
}

userSchema.pre('save',saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)

export const User = mongoose.model <User,UserModel>('User',userSchema)

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