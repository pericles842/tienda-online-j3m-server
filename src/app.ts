// src/app.ts
import express from 'express';
import { sequelize } from './app/config/db';
import routes from './routes';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import chalk from 'chalk';
import { getLocalIp } from './utils/systemFunctions';

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); //'dev' o 'combined' para más info

// View engine (EJS) — quítalo si solo será API
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas API
app.use('/api/', routes);

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
})



const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {

    try {
        await sequelize.authenticate();
        const address = getLocalIp();
        const actualPort = (server.address() as any).port;

        console.log(chalk.hex('#FF69B4')('🟢 Conectado a Mysql'));
        console.log(chalk.hex('#FF69B4')(`🟢 Servidor listo en http://${address}:${actualPort}`));

    } catch (error) {
        console.log(chalk.red('Hubo un problema'), error);
    }
});
