import { Sequelize } from "sequelize-typescript";
import {fileURLToPath} from 'url'
import { dirname } from "path";
import dotenv from 'dotenv'

// Recreamos __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*.ts']
})

export default db
