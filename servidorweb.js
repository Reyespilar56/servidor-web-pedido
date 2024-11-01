const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Ruta para guardar el archivo
const filePath = path.join(__dirname, 'datos', 'contact_messages.txt');

app.post('/send-email', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Formatear los datos a guardar
    const data = `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}\n\n`;

    // Guardar los datos en el archivo
    fs.appendFile(filePath, data, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Error al guardar los datos' });
        }
        res.status(200).json({ message: 'Datos guardados exitosamente' });
    });
});

// Inicia el servidor
app.listen(3010, () => {
    console.log('Servidor corriendo en http://localhost:3010');
});
