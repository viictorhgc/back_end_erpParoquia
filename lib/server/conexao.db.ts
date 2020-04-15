import { Sequelize } from 'sequelize';
import {environment} from '../commom/environment'

export const database = new Sequelize({
    username: environment.db.db_user,
    password: environment.db.db_password,
    host: environment.db.db_host,
    port: environment.db.db_port,
    database: environment.db.db_database,
    dialect: 'postgres'
})

