import { CLientDTO } from 'src/clients/dtos/clients';
import { ClientsERPRepository } from '../clients-erp.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CustomerERPRepositorySql implements ClientsERPRepository {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async create(data: CLientDTO): Promise<void> {
    try {
      const query = {
        text: 'INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
        values: [data.name, data.email, data.phone],
      };

      await this.pool.query(query);
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: CLientDTO): Promise<void> {
    const query = {
      text: 'UPDATE clients SET name = $2, email = $3, phone = $4 WHERE id = $1 RETURNING *',
      values: [id, data.name, data.email, data.phone],
    };

    try {
      const result = await this.pool.query(query);
      if (result.rowCount <= 0) {
        throw new NotFoundException('Cliente não encontrado');
      }
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    const query = {
      text: 'DELETE FROM clients WHERE id = $1 RETURNING *',
      values: [id],
    };
    try {
      const result = await this.pool.query(query);
      if (result.rowCount <= 0) {
        throw new NotFoundException('Cliente não encontrado');
      }
    } catch (error) {
      throw error;
    }
  }
  async find(id: string): Promise<CLientDTO> {
    const query = {
      text: 'SELECT * FROM clients WHERE id = $1',
      values: [id],
    };

    try {
      const result = await this.pool.query(query);
      if (result.rowCount > 0) {
        const client = result.rows[0];
        return client;
      } else {
        throw new NotFoundException('Cliente não encontrado');
      }
    } catch (error) {
      throw error;
    }
  }
  async list(): Promise<CLientDTO[]> {
    const page = 1; // Número da página desejada
    const pageSize = 10; // Número de resultados por página

    const offset = (page - 1) * pageSize;

    const query = {
      text: 'SELECT * FROM clients ORDER BY id LIMIT $1 OFFSET $2',
      values: [pageSize, offset],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }
}
