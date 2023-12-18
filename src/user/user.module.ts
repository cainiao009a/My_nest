import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@/common/database/database.module';
import { UserProviders } from './user.providers';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';
// @Module({
//   controllers: [FeishuController],
//   providers: [FeishuService],
// })
@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    FeishuController,
    UserController
  ],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService],
})
export class UserModule { }
