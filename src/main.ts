import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getAllRoutes } from './_utils/app.util';
import { Endpoint, HttpMethods } from './endpoint/entities/endpoint.entity';
import { Role } from './role/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('eCommerce')
    .setDescription('The eCommerce API description')
    .setVersion('1.0')
    .addTag('eCommerce')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;

  const { routes } = getAllRoutes(router);

  const dataSource = app.get(DataSource);
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.connect();

    await queryRunner.startTransaction();

    await queryRunner.query('TRUNCATE endpoint RESTART IDENTITY CASCADE');
    for (const route of routes) {
      const [method, url] = route.split(' ');

      queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Endpoint)
        .values({ url, method: method as HttpMethods })
        .execute();
    }

    const roles = await queryRunner.manager
      .getRepository(Role)
      .createQueryBuilder()
      .where({ isActive: true })
      .getMany();

    const endpoints = await queryRunner.manager
      .getRepository(Endpoint)
      .createQueryBuilder()
      .getMany();

    for (const role of roles) {
      for (const endpoint of endpoints) {
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Permission)
          .values({
            roleName: role.name,
            endpointId: endpoint.id,
            isAllow: role.name === 'admin' ? true : false,
          })
          .execute();
      }
    }

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log(error);
  } finally {
    await queryRunner.release();
  }
}
bootstrap();
