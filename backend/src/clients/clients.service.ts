import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CLientDTO } from './dtos/clients';
import { ClientsERPRepository } from './repositories/clients-erp.service';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsERPRepository: ClientsERPRepository) {}

  async create(data: CLientDTO): Promise<void> {
    try {
      await this.clientsERPRepository.create(data);
    } catch (error) {
      if (
        error instanceof HttpException &&
        (error.getStatus() === HttpStatus.BAD_REQUEST ||
          error.getStatus() === HttpStatus.NOT_FOUND)
      ) {
        throw error;
      } else {
        throw new Error(`Error ao criar cliente: ${error}`);
      }
    }
  }
  async list(): Promise<CLientDTO[]> {
    try {
      return await this.clientsERPRepository.list();
    } catch (error) {
      if (
        error instanceof HttpException &&
        (error.getStatus() === HttpStatus.BAD_REQUEST ||
          error.getStatus() === HttpStatus.NOT_FOUND)
      ) {
        throw error;
      } else {
        throw new Error(`Error ao listar cliente: ${error}`);
      }
    }
  }
  async find(id: string): Promise<CLientDTO> {
    try {
      return await this.clientsERPRepository.find(id);
    } catch (error) {
      if (
        error instanceof HttpException &&
        (error.getStatus() === HttpStatus.BAD_REQUEST ||
          error.getStatus() === HttpStatus.NOT_FOUND)
      ) {
        throw error;
      } else {
        throw new Error(`Error ao buscar cliente: ${error}`);
      }
    }
  }
  async update(id: string, data: CLientDTO): Promise<void> {
    try {
      await this.clientsERPRepository.update(id, data);
    } catch (error) {
      if (
        error instanceof HttpException &&
        (error.getStatus() === HttpStatus.BAD_REQUEST ||
          error.getStatus() === HttpStatus.NOT_FOUND)
      ) {
        throw error;
      } else {
        throw new Error(`Error ao atualizar cliente: ${error}`);
      }
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.clientsERPRepository.delete(id);
    } catch (error) {
      if (
        error instanceof HttpException &&
        (error.getStatus() === HttpStatus.BAD_REQUEST ||
          error.getStatus() === HttpStatus.NOT_FOUND)
      ) {
        throw error;
      } else {
        throw new Error(`Error ao deletar cliente: ${error}`);
      }
    }
  }
}
