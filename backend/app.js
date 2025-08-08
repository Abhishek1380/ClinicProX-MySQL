
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');

app.use(cors());
app.use(express.json());

const apiRoutes = require('./routes/api_routes');
app.use('/', apiRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
