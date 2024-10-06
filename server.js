// server.js
const express = require('express');
const axios = require('axios');
const { findStars, fetchImageUrls, downloadImageFromUrl, startAudioCreation, IMAGE_URLS, DEFAULT_OUTPUT_FILENAME } = require('./controllers/controller');
const path = require('path');

const app = express();
app.use(express.json());  // Para manejar JSON en solicitudes

// Ruta para procesar las imágenes de la web
app.get('/api/process-image', (req, res) => {
    fetchImageUrls();
    if (IMAGE_URLS.length) {
        const response = {
            status: 'success',
            images: IMAGE_URLS.map((url, i) => ({ index: i, url }))
        };
        res.json(response);
    } else {
        res.status(404).json({ status: 'error', message: 'No se encontraron imágenes' });
    }
});

// Ruta para crear audio desde la imagen seleccionada
app.post('/api/create-audio', (req, res) => {
    const { index, maxStars, interval = 350 } = req.body;
    
    if (index !== undefined && index >= 0 && index < IMAGE_URLS.length) {
        const imageUrl = IMAGE_URLS[index];
        downloadImageFromUrl(imageUrl)
            .then((image) => {
                const coords = findStars(image);
                startAudioCreation(coords, image.width, DEFAULT_OUTPUT_FILENAME, maxStars, interval, 
                    (progress) => {}, // Actualiza el progreso
                    (success) => res.json({ status: 'success', message: `Audio generado para la imagen ${index}` })
                );
            })
            .catch(err => res.status(400).json({ status: 'error', message: 'No se pudo descargar la imagen' }));
    } else {
        res.status(400).json({ status: 'error', message: 'Índice inválido' });
    }
});

// Ruta para descargar el audio generado
app.get('/api/download-audio', (req, res) => {
    res.download(path.join(__dirname, DEFAULT_OUTPUT_FILENAME));
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
