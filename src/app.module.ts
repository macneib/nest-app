import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthzModule } from './healthz/healthz.module';

@Module({
  imports: [
    HealthzModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
