import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as pactum from 'pactum';
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto";
import { EditUserDto } from "../src/user/dto";
import { CreateBookmarkDto, EditBookmarkDto } from "src/bookmark/dto";

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333',);
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: "tla149@email.com",
      password: "thisispassword",
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
      });

      it('should throw if password empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email
        })
        .expectStatus(400)
      });

      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .expectStatus(400)
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          // .inspect();
      });

    });
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
      });

      it('should throw if password empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email
        })
        .expectStatus(400)
      });

      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400)
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
          // .inspect();
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          // .inspect();
      });
    });
  });

  describe('Edit user', () => {
    it('should edit user', () => {
      const dto: EditUserDto = {
        firstName: "Simjh",
        email: "tla149@daum.net",
      }
      return pactum
        .spec()
        .patch('/users')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.firstName)
        .expectBodyContains(dto.email);
    });
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmark', () => {
      it('should get bookmarks', () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200)
        .expectBody([])
        // .inspect();
      });
    });

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: "First Bookmark",
        description: "NestJs Course for Beginners - Create a REST API",
        link: "https://www.youtube.com/watch?v=GHTA143_b-s&t=1332s",
      }
      it('should create bookmark', () => {
        return pactum
        .spec()
        .post('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('bookmarkId', 'id')
      })
    });

    describe('Get bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200)
        .expectJsonLength(1)
        // .inspect();
      })
    });

    describe('Get bookmark by id', () => {
      it('should get bookmark by', () => {
        return pactum
        .spec()
        .get('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200)
        .expectBodyContains('$S{bookmarkId}');
      })
    });
    describe('Edit bookmark by id', () => {
      it('should edit bookmark', () => {
        const dto: EditBookmarkDto = {
          description: '당신의 이야기가 값진 수익이 됩니다. 심사부터 광고 설정, 수익 확인까지 티스토리에서 바로 할 수 있어요.'
        }

        return pactum
        .spec()
        .patch('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains('$S{bookmarkId}')
        // .inspect();
      })
    });

    describe('Delete bookmark by id', () => {
      it('should delete bookmark', () => {
        return pactum
        .spec()
        .delete('/bookmarks/{id}')
        .withPathParams('id', '$S{bookmarkId}')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(204)
        // .inspect();
        });

      it('should get bookmarks', () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200)
        .expectJsonLength(0)
        .expectBody([])
        // .inspect();
      });
    });

  });
});