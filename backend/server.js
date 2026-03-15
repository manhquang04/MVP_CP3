const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 15000,
    retryWrites: true,
    w: 'majority',
    tls: true,
    tlsAllowInvalidCertificates: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Tip: Kiểm tra lại MONGO_URI và network connection');
});

app.get('/', (req, res) => {
    res.json({ message: 'WanderTale API is running' });
});

// Health check endpoint for deployment platforms
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const imagesRoutes = require('./routes/images');
const tripsRoutes = require('./routes/trips');
const placesRoutes = require('./routes/places');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/places', placesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
