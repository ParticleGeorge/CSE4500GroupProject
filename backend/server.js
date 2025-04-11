import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import connectDB from './db.js';
import apiRouter from './routes/api.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
};

app.use (cors(corsOptions));
app.use(express.json());

app.use(
    session({
        store: new session.MemoryStore,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            sameSite: 'lax',
            httpOnly: true,
        }
    })
);

//sample route for text response
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', apiRouter);

//sample protected route
app.post('/api/user', (req, res) => {
    res.json({ message: "User created successfully!" });
});

//start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
