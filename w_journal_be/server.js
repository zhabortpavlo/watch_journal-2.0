require('dotenv').config();  // Завантажує змінні з .env файлу
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');  // Для хешування та перевірки паролів

const app = express();
const port = process.env.PORT || 5000;

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Connection error:', err));

// Налаштування CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],  // Дозволені методи
  allowedHeaders: ['Content-Type']  // Дозволені заголовки
}));


app.use(express.json());  // Дозволяє парсити JSON запити

// Проста стартова точка (маршрут) для перевірки роботи сервера
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

const User = require('./models/User');  // Імпорт моделі користувача

// Маршрут для реєстрації користувача
app.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Маршрут для логіну користувача
app.post('/api/login', async (req, res) => {
  console.log('Request body:', req.body);  // Логування запиту

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);  // Логування помилок
    res.status(500).json({ error: 'Error logging in' });
  }
});





// Старт сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
