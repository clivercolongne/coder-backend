const fs = require('fs')

class Libreria {
    constructor(filename="./data/productos.json") {
        
        this.id = 0
        this.list = []
        this.filename = filename

        this.init()
    }

    init() {
        console.log(`Loading ${this.filename} ...`)
        const data = fs.readFileSync(this.filename)
        const listaFromFile = JSON.parse(data)
        for(const obj of listaFromFile) {
            this.insert(obj)
        }
        console.log("File loaded.")
    }
 
    find(id){


        let objeto  = this.list.find(obj => obj.id == id)
         if (objeto ==  undefined ){
                return console.log('error : producto no encontrado' );
            
        }
        else {
            return   this.list.find((obj) => obj.id == id)
        }
      
        
    }
   
    update(id, obj){
        const index = this.list.findIndex((objT)=> objT.id == id);
        obj.id=this.list[index].id
        this.list[index] =obj;

        return obj;
    }
    insert(obj) {
        obj.id = ++this.id
        this.list.push(obj)

        return obj
    }
    delete(id) {

        for(const index in this.list) {
            let element = this.list[index]
            if(element.id == id) {
                this.list.splice(index, 1)                                        
                break;
            }
        }

        
    }

}

module.exports = Libreria