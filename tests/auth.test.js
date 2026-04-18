const request = require('supertest');
const app = require('../app');

describe('Auth endpoints', () => {

  describe('POST /api/signup', () => {
    it('debe registrar un usuario nuevo', async () => {
      const res = await request(app)
        .post('/api/signup')
        .send({
          nombre: 'Test Jest',
          email: `testjest${Date.now()}@test.com`,
          password: '123456'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.mensaje).toBe('Usuario creado correctamente');
    });

    it('debe fallar si el email ya existe', async () => {
      const res = await request(app)
        .post('/api/signup')
        .send({
          nombre: 'Elena',
          email: 'elena@test.com',
          password: '123456'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('El email ya está registrado');
    });
  });

  describe('POST /api/login', () => {
    it('debe hacer login correctamente', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'elena@test.com',
          password: '123456'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.mensaje).toBe('Login correcto');
    });

    it('debe fallar con contraseña incorrecta', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'elena@test.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Email o contraseña incorrectos');
    });

    it('debe fallar con email inexistente', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'noexiste@test.com',
          password: '123456'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Email o contraseña incorrectos');
    });
  });

  describe('POST /api/logout', () => {
    it('debe hacer logout correctamente', async () => {
      const res = await request(app)
        .post('/api/logout');

      expect(res.statusCode).toBe(302);
    });
  });

});