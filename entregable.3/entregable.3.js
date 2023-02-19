import express, { json } from 'express';
import ProductManager from '../entregable.2/entregable.2.js';


const app = express();
const productManager = new ProductManager('./entregable.2/products.json');

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit); // Obtener el valor del query param "limit"
    const products = await productManager.getProducts();
    if (!Number.isNaN(limit)) { // Si se proporciona un límite
        res.send(products.slice(0, limit)); // Devuelve los productos hasta el límite proporcionado
      } else {
        res.send(products); // Devuelve todos los productos
      }

}); 

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid); // Obtener el id del producto de los parámetros de la URL
    const product = await productManager.getProductById(productId); // Obtener el producto por su id
  
    if (product) {
      res.send(product); // Devuelve el producto solicitado
    } else {
      res.status(404).send('Producto no encontrado'); // Devuelve un error 404 si no se encuentra el producto
    }
  });



const port = 8080;

app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto ${port}`);
});