const request = require('supertest');
const app = require('../app');

describe('Movie endpoints', () => {

  let cookie;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'elena@test.com',
        password: '123456'
      });
    cookie = res.headers['set-cookie'];
  });

  describe('GET /api/movie/:title', () => {
    it('debe buscar películas por título', async () => {
      const res = await request(app)
        .get('/api/movie/inception')
        .set('Cookie', cookie);

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('debe devolver 404 si no hay resultados', async () => {
      const res = await request(app)
        .get('/api/movie/xxxxxxxxxxxxxxxxxxx')
        .set('Cookie', cookie);

      expect(res.statusCode).toBe(404);
    });

    it('debe fallar sin token', async () => {
      const res = await request(app)
        .get('/api/movie/inception');

      expect(res.statusCode).toBe(302);
    });
  });

  describe('GET /api/movie/detail/:imdbID', () => {
    it('debe obtener el detalle de una película', async () => {
      const res = await request(app)
        .get('/api/movie/detail/tt1375666')
        .set('Cookie', cookie);

      expect(res.statusCode).toBe(200);
      expect(res.body.Title).toBe('Inception');
    });
  });

});