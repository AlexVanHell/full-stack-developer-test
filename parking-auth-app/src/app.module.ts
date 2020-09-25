import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { PasswordModule } from './module/password/password.module';

@Module({
  imports: [SharedModule, PasswordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
