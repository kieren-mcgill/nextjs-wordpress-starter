import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: path.resolve(__dirname, '..') });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());

    // By default, handle routes in Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
