// controllers/controller.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');  // Para manipular imágenes
const { createAudioFromCoordinates } = require('./audioUtils');

// Definir la constante para el nombre del archivo de audio generado
const DEFAULT_OUTPUT_FILENAME = "audio_coordenadas_estelares.mp3";
const AUDIO_FOLDER = path.join(__dirname, '../output');

// Definir la lista de URLs de imágenes
const IMAGE_URLS = [
    "https://stsci-opo.org/STScI-01J7BVGEPR6BTSCGHRG8MM8GDJ.jpg",
    "https://stsci-opo.org/STScI-01J5E84FQE409A25RG9KCSSCRS.png",
    // ... más URLs
];

function fetchImageUrls() {
    return IMAGE_URLS;
}

function downloadImageFromUrl(url) {
    return axios({
        url,
        responseType: 'arraybuffer'
    }).then(response => {
        return Jimp.read(Buffer.from(response.data, 'binary'));
    }).catch(err => {
        console.error(`Error al descargar la imagen: ${err}`);
        throw err;
    });
}

function findStars(image) {
    // Implementar detección de estrellas con Jimp o una librería de procesamiento de imágenes
    let starCoords = [];
    // Supongamos que extraemos coordenadas de estrellas aquí
    return starCoords;
}

function startAudioCreation(coords, imageWidth, outputFilename, maxStars, interval, updateProgress, finishCallback) {
    createAudioFromCoordinates(coords, imageWidth, outputFilename, maxStars, interval, updateProgress, finishCallback);
}

module.exports = {
    fetchImageUrls,
    downloadImageFromUrl,
    findStars,
    startAudioCreation,
    IMAGE_URLS,
    DEFAULT_OUTPUT_FILENAME
};
