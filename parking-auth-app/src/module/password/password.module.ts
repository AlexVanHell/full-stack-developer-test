import { Module } from '@nestjs/common';
import { PasswordService } from './service/password.service';
import { PasswordController } from './controller/password.controller';

@Module({
  providers: [PasswordService],
  controllers: [PasswordController]
})
export class PasswordModule {}
