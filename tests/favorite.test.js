const request = require('supertest');
const app = require('../app');

describe('Favorites endpoints', () => {

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

  describe('POST /api/favorites', () => {
    it('debe añadir una película a favoritos', async () => {
      const res = await request(app)
        .post('/api/favorites')
        .set('Cookie', cookie)
        .send({
          movie_ref: 'tt1375666',
          movie_source: 'omdb'
        });

      expect([201, 400]).toContain(res.statusCode);
    });

    it('debe fallar sin token', async () => {
      const res = await request(app)
        .post('/api/favorites')
        .send({
          movie_ref: 'tt1375666',
          movie_source: 'omdb'
        });

      expect(res.statusCode).toBe(302);
    });
  });

  describe('GET /api/favorites', () => {
    it('debe obtener los favoritos del usuario', async () => {
      const res = await request(app)
        .get('/api/favorites')
        .set('Cookie', cookie);

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('debe fallar sin token', async () => {
      const res = await request(app)
        .get('/api/favorites');

      expect(res.statusCode).toBe(302);
    });
  });

  describe('DELETE /api/favorites/:movie_ref', () => {
    it('debe eliminar una película de favoritos', async () => {
      const res = await request(app)
        .delete('/api/favorites/tt1375666')
        .set('Cookie', cookie);

      expect([200, 404]).toContain(res.statusCode);
    });
  });

});