import express from 'express';
import "dotenv/config"
import routes from './routes/index.js'
import ErrorHandler from './utils/errorHandler.js';

const app = express();

//Middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use(routes)
app.use(ErrorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})