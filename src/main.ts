import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
//  配置统一响应格式
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
// 文档内容
import { generateDocument } from './doc';

// 热更新配置
declare const module: any;
async function bootstrap() {
  // 热启动配置
  if(module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    );
    
   // 文档创建
   generateDocument(app)

   
  // 配置统一响应格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // 接口版本化管理
  app.enableVersioning({
    // 配置全局版本控制
    // defaultVersion: '1',
    // 单个版本控制配置
    defaultVersion: [VERSION_NEUTRAL, '1','2'],
    type: VersioningType.URI,
  });

  await app.listen(3000);
}
bootstrap();

