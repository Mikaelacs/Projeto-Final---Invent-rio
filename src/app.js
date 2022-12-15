require("dotenv").config();
const express = require("express")
const index = require("./routes/index")
const Especies = require("./routes/rota-teste")
const db = require ("./database/dbConnect");

db.connect()

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com o banco de dados feita com sucesso')
});

const app = express()

app.use(express.json())
app.use("/", index);
app.use("/Especies", Especies);

module.exports = app