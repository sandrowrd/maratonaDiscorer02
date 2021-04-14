const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")


server.set('view engine', 'ejs')
//habilitar arquivos estaticos
server.use(express.static("public"))

//informar onde está o caminho da pasta view
server.set('views', path.join(__dirname, 'views'))


//habilita o req.body
server.use(express.urlencoded({extended: true}))

server.use(routes)

server.listen(3000, () => console.log('rodando'))
//console.log(server)
