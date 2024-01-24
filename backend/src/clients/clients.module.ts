import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsERPRepository } from './repositories/clients-erp.service';
import { CustomerERPRepositorySql } from './repositories/implementations/clients-erp-sql.service';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: ClientsERPRepository,
      useClass: CustomerERPRepositorySql,
    },
  ],
  imports: [],
  exports: [ClientsService],
})
export class ClientsModule {}
