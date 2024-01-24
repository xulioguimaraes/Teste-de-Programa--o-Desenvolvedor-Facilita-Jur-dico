import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
