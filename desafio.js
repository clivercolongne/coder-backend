const express = require('express')
const Libreria = require('./prod/contenedor')
const { Router } = express;

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.set('views', './views')
app.set('view engine', 'ejs')


const router = Router();
const libreria = new Libreria(__dirname + "/data/productos.json")

router.get("/", (req, res) => {
    return res.json(libreria.list)
})
router.get("/:id", (req, res) => {
    let id =req.params.id
    return res.json(libreria.find(id))
})
router.post("/", (req, res) => {
    let obj =req.body
    return res.json(libreria.insert(obj))
})
router.put("/:id", (req, res) => {
    let obj =req.body
    let id=req.params.id
    return res.json(libreria.update(id, obj))
})
router.delete("/:id", (req, res) => {
    let id=req.params.id
    return res.json(libreria.delete(id))
})

app.use("/api/productos", router)


app.get('/', (req, res)=>{

    return res.render('form')
})
app.get('/list', (req, res)=>{
    return res.render('list', {
        list:libreria.list
        } )
})

app.listen(8080)