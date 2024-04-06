// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://15.228.35.138:27017/awsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definición del esquema del producto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

// Configuración del middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para mostrar el formulario
app.get('/productos/nuevo', (req, res) => {
  res.send(`
    <form action="/productos" method="post">
      <label for="name">Nombre:</label><br>
      <input type="text" id="name" name="name"><br>
      <label for="price">Precio:</label><br>
      <input type="text" id="price" name="price"><br><br>
      <button type="submit">Guardar</button>
    </form>
  `);
});

// Ruta para manejar el envío del formulario y guardar el producto en la base de datos
app.post('/productos', (req, res) => {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  product.save()
    .then(() => res.send('Producto guardado exitosamente'))
    .catch(err => res.status(400).send(`Error al guardar el producto: ${err.message}`));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
