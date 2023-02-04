class ProductManager{
    #products;
    #numId;
    constructor(){
        this.#products = [];
        this.#numId = 0;
    }

    addProducts(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.warn("Todos los campos son obligatorios");
            return;
        }

        const product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        const repetedProduct = this.#products.find((elem) => elem.code === code);

        if(!repetedProduct){
            const newProduct = {...product, id: this.#numId++}
            this.#products.push(newProduct);
        }else{
            console.log('El producto ya se encuentra agragado');
        }
        
        
    }

    getProducts(){
        if(this.#products.length === 0){
            console.log("No hay productos agregados");
        }else{
            return  this.#products;
        }
    }

    getProductById(id){
        const productById = this.#products.find((prod) => prod.id === id);
        
        if(!productById){
            return "Producto no encontrado.";
        }
        return productById;
    }

}

const productManager = new ProductManager();
productManager.addProducts("product1", "descprod1",100, "img", 1, 2);
productManager.addProducts("product2", "descprod2", 100, "img", 3, 2);
productManager.addProducts("product3", "descprod3", 100, "img", 2, 2);

console.log('productos', productManager.getProducts());
console.log(productManager.getProductById(12));
console.log('producto por id 1: ', productManager.getProductById(1));

console.log('test products ', productManager.products);
console.log('test numId ', productManager.numId);