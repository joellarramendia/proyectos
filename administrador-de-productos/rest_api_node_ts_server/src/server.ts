import express from "express";
import colors from 'colors'
import router from "./router";
import db from "./config/db";

//Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.magenta.bold('Conexion exitosa'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error con la conexion'))
    }
}

connectDB()

const server = express()


server.use('/api/products', router)



export default server