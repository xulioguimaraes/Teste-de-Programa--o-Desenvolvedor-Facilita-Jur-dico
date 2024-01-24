import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      useFactory: async () => {
        return new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          password: process.env.DB_PASSWORD,
          port: parseInt(process.env.DB_PORT || '5432', 10),
        });
      },
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
