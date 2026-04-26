const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // Sirve la carpeta public

app.get('/api/weather', async (req, res) => {
    try {
        const { city } = req.query;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: "Ciudad no encontrada" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});