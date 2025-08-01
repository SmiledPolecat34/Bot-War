const request = require('supertest');
const app = require('../src/server');

describe('API Bot-War Controller', () => {
    beforeEach(async () => {
        await request(app)
            .post('/action')
            .send({ move: 'STAY', action: 'NONE' })
            .expect(200);
    });

    it('GET /action renvoie le défaut STAY/NONE', async () => {
        const res = await request(app).get('/action');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ move: 'STAY', action: 'NONE' });
    });

    it('POST /action puis GET /action renvoie la commande définie', async () => {
        const command = { move: 'UP', action: 'COLLECT' };
        const post = await request(app)
            .post('/action')
            .send(command);
        expect(post.status).toBe(200);
        expect(post.body).toEqual({ status: 'ok', cmd: command });

        const get = await request(app).get('/action');
        expect(get.status).toBe(200);
        expect(get.body).toEqual(command);
    });

    it('GET / renvoie la page HTML', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/html/);
    });

    it('route inexistante renvoie 404', async () => {
        await request(app).get('/does-not-exist').expect(404);
    });
});
