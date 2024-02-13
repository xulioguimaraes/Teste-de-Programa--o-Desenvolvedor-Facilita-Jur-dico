import {
  CLientDTO,
  ClientTypes,
  ListClientsRequst,
} from 'src/clients/dtos/clients';
import { ClientsERPRepository } from '../clients-erp.service';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Pool } from 'pg';
import axios from 'axios';

@Injectable()
export class CustomerERPRepositorySql implements ClientsERPRepository {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}
  async emailExists(email: string): Promise<boolean> {
    const query = {
      text: 'SELECT COUNT(*) FROM clients WHERE email = $1',
      values: [email],
    };

    const result = await this.pool.query(query);
    const count = parseInt(result.rows[0].count, 10);

    return count > 0;
  }

  async create(data: CLientDTO): Promise<void> {
    try {
      const emailExists = await this.emailExists(data.email);

      const directionsURL =
        'https://maps.googleapis.com/maps/api/directions/json';
      const origin = '-5.1348173,-49.3320079'; // Latitude e longitude do ponto de partida
      const destination = `${data.latitude},${data.longitude}`;
      const response = await axios.get(directionsURL, {
        params: {
          origin: origin,
          destination: destination,
          key: process.env.API_GOOGLE_KEY,
        },
      });
      const distance = response?.data.routes[0].legs[0].distance.text || null;
      if (emailExists) {
        throw new BadRequestException('E-mail já cadastrado');
      }
      const query = {
        text: 'INSERT INTO clients (name, email, phone, address, latitude, longitude, distance) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        values: [
          data.name,
          data.email,
          data.phone,
          data.address,
          data.latitude,
          data.longitude,
          distance,
        ],
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
  async list(params: ListClientsRequst): Promise<CLientDTO[]> {
    const { page, per_page, search_term } = params;

    const offset = (+page - 1) * +per_page;
    const searchCondition = search_term
      ? `WHERE name ILIKE $3 OR phone ILIKE $3 OR email ILIKE $3`
      : '';

    const query = {
      text: `SELECT * FROM clients ${searchCondition} ORDER BY id LIMIT $1 OFFSET $2`,
      values: search_term
        ? [per_page, offset, `%${search_term}%`]
        : [per_page, offset],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }
  async calculateDistance(): Promise<ClientTypes[]> {
    const query = {
      text: `SELECT *,
      CASE
          WHEN distance IS NULL THEN null
          ELSE substring(distance, '([0-9]+(\.[0-9]+)?)')::numeric
      END AS distance_numeric
FROM clients
ORDER BY
 CASE
   WHEN distance IS NULL THEN 1  
   ELSE 0  
 END,
 distance_numeric ASC NULLS LAST;`,
    };

    const result = await this.pool.query(query);
    return result.rows;
  }
}
