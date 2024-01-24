import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: 'localhost',
  host: 'host.docker.internal',
  port: 5432,
  username: 'postgres',
  password: 'pgpassword',
  database: 'board-db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
