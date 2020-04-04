import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

let data;
try {
    const rawData = fs.readFileSync(path.join(__dirname, '../conferences.json'));
    data = JSON.parse(rawData);
} catch (er) {
    console.error(er.message);
}

router.get('/', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    res.json(data);
});

router.get('/search', (req, res) => {
    if (!data) {
        return res.status(404).json({ message: 'Данные не найдены' });
    }
    let interimDate = data.slice();
    let result = [];
    const params = Object.keys(req.query);
    for (let i = 0; i < params.length; i++) {
        interimDate.forEach((item) => {
            if (search(item, params[i], req.query[params[i]])) {
                result.push(item);
            }
        });
        interimDate = result.slice();
        result = [];
    }
    res.json(interimDate);
});

function search(obj, key, value) {
    for (let item in obj) {
        if (item === key) {
            if (obj[item] === value) return true;
        }
        if (Array.isArray(obj[item])) {
            if (obj[item].includes(value)) return true;
        }
        if (typeof obj[item] === 'object' && obj[item] !== null) {
            if (search(obj[item], key, value)) return true;
        }
    }
    return false;
}

export default router;
