import express, { json } from 'express';
import conf from './routes/conf';

const port = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use('/conf', conf);

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));