import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { newEnforcer } from 'casbin';
import { authz } from './authorization.middleware';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(authz(async() => {
      const enforcer = await newEnforcer(join(__dirname, 'casbin_conf/model.conf'), join(__dirname, 'casbin_conf/policy.csv'));
      return enforcer;
  }));
  await app.listen(3000);
}
bootstrap();
