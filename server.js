// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const validatorsPost = ['author','title']

server.use(middlewares)

server.use((req, res, next) => {
    if (req.headers.authorization === "hola") {
        next()
    } else {
        res.status(401).jsonp({
            error: "Afuera de aqui"
        })
    }
})

server.use(jsonServer.bodyParser)

server.post('/posts', (req, res, next) => {
    let menssage = ""
    validatorsPost.forEach(validator => {
        if(!req.body.hasOwnProperty(validator)){
            menssage += " " + validator
        }
    });
    if (menssage === ""){
        next()
    }else{
        res.status(206).jsonp({
            error: "Falta propiedades:"+menssage
        })
    }
        
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})