import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      // dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA),
      autoLoadEntities: true,
    }),
    MoviesModule,
  ],

  // providers: [JwtService],
})
export class AppModule {}
