import fs from 'fs';
const path = './entregable.2/products.json';

class ProductManager {
    constructor(path) {
      this.path = path;
    }
  
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
      return result;
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
    code: 1,
    title: 'Manzana',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 120,
    stock: 50,
}

const product2 = {
    code: 2,
    title: 'Banana',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 300,
    stock: 50,
}

const product3 = {
    code: 3,
    title: 'kiwi',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 180,
    stock: 50,
}

const product4 = {
    code: 4,
    title: 'Ananá',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 300,
    stock: 30,
}

const product5 = {
    code: 5,
    title: 'Melon',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 500,
    stock: 100,
}

const product6 = {
    code: 6,
    title: 'Papa',
    description: 'Es un tuberculo',
    thumbnail: 'image', 
    price: 200,
    stock: 150,
}

const product7 = {
    code: 7,
    title: 'Lechuga',
    description: 'Es una verdura de hojas',
    thumbnail: 'image', 
    price: 120,
    stock: 50,
}

const product8 = {
    code: 8,
    title: 'Achicoria',
    description: 'Es una verdura de hojas',
    thumbnail: 'image', 
    price: 180,
    stock: 20,
}

const product9 = {
    code: 9,
    title: 'Limon',
    description: 'Es una fruta',
    thumbnail: 'image', 
    price: 250,
    stock: 90,
}

const product10 = {
    code: 10,
    title: 'Jengibre',
    description: 'Es una raíz',
    thumbnail: 'image', 
    price: 580,
    stock: 15,
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
    await productManager.addProduct(product4); 
    await productManager.addProduct(product5); 
    await productManager.addProduct(product6); 
    await productManager.addProduct(product7); 
    await productManager.addProduct(product8); 
    await productManager.addProduct(product9); 
    await productManager.addProduct(product10); 
}

main();

export default ProductManager;

/**28:46 */