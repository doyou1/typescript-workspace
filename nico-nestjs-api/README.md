# Decorator

```typescript
@Controller, @Module, @Injectable
```

# Module

- 애플리케이션의 일부
  - 인증을 담당하는 모듈 ? AuthModule

# Single-resposibility principle

- 하나의 module, class, function이 하나의 기능만 담당해야 한다.

# Validaiton Pipe

```typescript
new ValidationPipe({
    whitelist: true,
    // request 자체를 거부
    forbidNonWhitelisted: true, // "property hacked should not exist", validation decorator가 없는 데이터는 통과조차 하지 못함
    transform: true, // 데이터의 변환을 쉽게함 "2022"를 number로 받을 수 있음
}),
```

# nestjs DI(Dependency Injection)

- type만 import해서 사용할 수 있다?
- 생성해서 사용할 필요없다?

```typescript
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
})

constructor(private readonly moviesService: MoviesService) {}
```

# express in nestjs

- nestjs는 express상에서 동작한다.

```typescript
getAll(@Req() req, @Res() res): Movie[] {
```

- request, response을 활용하면 => express에 접근하는거다 ?
- @req, @res에 접근하는건 express에 직접적으로 접근하는거기에, nestjs의 규율을 위반할 수 있으니, 조심이 다뤄라?
- 원하면 express가 아니라, fastify를 활용할 수도 있다.
- 성능 향상(performance)을 위해선 fastify를 이용해라?
