const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://bot.gogokodo.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let cmd = { move: 'STAY', action: 'NONE' };

app.get('/action', (req, res) => {
    res.json(cmd);
});

app.post('/action', (req, res) => {
    const { move, action } = req.body;
    const MOVES = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY'];
    const ACTS = ['BOMB', 'COLLECT', 'NONE'];
    if (!MOVES.includes(move) || !ACTS.includes(action)) {
        return res.status(400).json({ error: 'Invalid move/action' });
    }
    cmd = { move, action };
    res.json({ status: 'ok', cmd });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`🔌 Controller listening on :${port}`));
}

module.exports = app;
