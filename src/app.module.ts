import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database-connection/database-connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: DatabaseConnectionService
  }),
  AuthModule, 
  UserModule],
  controllers: [AppController],
  providers: [AppService, DatabaseConnectionService],
})
export class AppModule {}
