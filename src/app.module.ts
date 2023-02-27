import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
// import { JwtStrategy } from './../src/auth/stratergies/jwt.strategy';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      // dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA),
      autoLoadEntities: true,
    }),
    MoviesModule,
    // JwtModule.register({
    //   secret: 'YOUR_SECRET_KEY',
    //   signOptions: { expiresIn: '30000s' },
    // }),
  ],

  // providers: [JwtService, AuthService, JwtStrategy],

  // providers: [AuthService, JwtStrategy],
  // exports: [AuthService],
})
export class AppModule {}
