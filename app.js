// Importamos el framework Express
const express = require('express');

// Inicializamos la aplicación
const app = express();

// Definimos el puerto. Usamos process.env.PORT para cuando se despliegue en Render, 
// y 3000 como puerto por defecto para pruebas locales.
const PORT = process.env.PORT || 3000;

// Arreglo de objetos en memoria (Nuestra "Base de Datos" temporal)
const libros = [
    { id: 1, nombre: "Cien Años de Soledad", año: 1967 },
    { id: 2, nombre: "1984", año: 1949 },
    { id: 3, nombre: "El Señor de los Anillos", año: 1954 },
    { id: 4, nombre: "Fahrenheit 451", año: 1953 }
];

app.get('/api/libros', (req, res) => {
    // Obtenemos el parámetro de consulta 'nombre' si existe
    const { nombre } = req.query;

    if (nombre) {
        // Si hay un parámetro de búsqueda, filtramos el arreglo.
        // Convertimos ambos textos a minúsculas para que la búsqueda no sea sensible a mayúsculas.
        const librosFiltrados = libros.filter(libro => 
            libro.nombre.toLowerCase().includes(nombre.toLowerCase())
        );

        if (librosFiltrados.length > 0) {
            return res.json(librosFiltrados);
        } else {
            return res.status(404).json({ mensaje: "No se encontraron libros con ese nombre" });
        }
    }

    // Si no hay parámetro de búsqueda, devolvemos todos los libros
    res.json(libros);
});

app.get('/api/libros/:id', (req, res) => {
    // Obtenemos el ID de los parámetros de la ruta y lo convertimos a número
    const libroId = parseInt(req.params.id);

    // Buscamos el libro en el arreglo cuyo ID coincida
    const libroEncontrado = libros.find(libro => libro.id === libroId);

    if (libroEncontrado) {
        // Si existe, respondemos con el objeto JSON del libro
        res.json(libroEncontrado);
    } else {
        // Si no existe, manejamos el error devolviendo un código 404 (Not Found)
        res.status(404).json({ mensaje: `El libro con el ID ${libroId} no fue encontrado` });
    }
});

// Iniciamos el servidor y lo ponemos a la escucha de peticiones
app.listen(PORT, () => {
    console.log(`Servidor de Libros corriendo exitosamente en http://localhost:${PORT}`);
});