import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'


dotenv.config()


// const db = new Sequelize(process.env.DATABASE_URL, {
//     models: [Product],
//     logging: false
// })

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.{ts,js}'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: 'true'
        }
    }
})

export default db
