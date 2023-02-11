const fs = require('fs');
const path = './segundo-entregable/products.json';


/**Esta es la clase que administra los productos. Tiene métodos para agregar, 
 * obtener, actualizar y eliminar productos. */
class ProductManager {
    constructor(path) {
      this.path = path;
    }
  
    /**Este método agrega un nuevo producto al archivo JSON. 
     * Verifica primero si un producto con el mismo código ya existe y si es así, 
     * devuelve un mensaje de error. Si no existe, agrega el producto y escribe el 
     * archivo JSON actualizado. */
    async addProduct(product) {
        let products = await this.getProducts();
        // Verifica si el producto ya existe en el archivo JSON
        let existingProduct = products.find(p => p.code === product.code);
        if (existingProduct) {
            console.log(`El producto con código ${product.code} ya existe en el archivo JSON.`);
            return;
        }
        product.id = products.length + 1;
        products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
  
    /**Este método devuelve todos los productos del archivo JSON. */
    async getProducts() {
        let products = [];
        if (fs.existsSync(this.path)) {
            products = JSON.parse(fs.readFileSync(this.path));
        }
        return products;
    }
  
    /**Este método devuelve un producto específico basado en su ID. */
    async getProductById(id) {
      let products = await this.getProducts();
      let result = products.filter(product => product.id === id);
      return console.log('result by id', result);
    }
  
    /**Este método actualiza un producto existente en el archivo JSON.  */
    async updateProduct(id, product) {
        try {
            let products = await this.getProducts();
            let index = products.findIndex(p => p.id === id);
            products[index] = {...products[index], ...product};
            console.log(`El objeto de id: ${id}, fue actualizado con éxito`);
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error(`Error al actualizar el producto con id ${id}: ${error}`);
        }
      }
  
    /**Este método elimina un producto del archivo JSON. */
    async deleteProduct(id) {
        let products = await this.getProducts();
      
        const newProducts = products.filter(product => product.id !== id);
        
        fs.writeFileSync(this.path, JSON.stringify(newProducts, null, 2));
      }
  }


/**************TESTING**************************************************** */

/**Estas son las constantes que definen los productos. */

const product1 = {
    code: 01,
    title: 'Manzana',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 120,
    stock: 50,
}

const product2 = {
    code: 02,
    title: 'Banana',
    description: 'Es una fruta actualizada',
    thumbnail: 'image', 
    price: 180,
    stock: 50,
}

const product3 = {
    code: 03,
    title: 'kiwi',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 180,
    stock: 50,
}


/**Esta es la función principal que se ejecuta al correr el código. 
 * Crea una nueva instancia de la clase ProductManager y llama a sus métodos 
 * para agregar, obtener, actualizar y eliminar productos. Finalmente, 
 * imprime todos los productos.
 */
async function main(){
    const productManager = new ProductManager(path);

    await productManager.addProduct(product1);  
    await productManager.addProduct(product2);  
    await productManager.addProduct(product3);  

    await productManager.getProductById(2);

   // await productManager.deleteProduct(1);
   await productManager.updateProduct(2, product2);
   await productManager.getProductById(2);

   console.log('obtener productos: ', await productManager.getProducts());
}

main();
