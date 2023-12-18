import {  Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // 开启全局
    }),
    ConfigModule.forRoot({ 
    ignoreEnvFile: true, 
    isGlobal: true,
    load: [getConfig]
  }),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

