import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PointDto } from '../src/controllers/dto/PointDto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/pixel-grids (GET)', () => {
    return request(app.getHttpServer())
      .get('/pixel-grids')
      .expect(200)
      .expect(['Grid1']);
  });

  it('/api/pixel-grids/Grid1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/pixel-grids/Grid1')
      .expect(200)
      .expect('0');
  });
  it('/api/pixel-grids/Grid1/color-pixel/000000 (GET)', () => {
    return request(app.getHttpServer())
      .post('/pixel-grids/Grid1/color-pixel/000000')
      .send(new PointDto(0, 0))
      .expect(201)
      .expect('0');
  });
});
