import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CLientDTO, ClientTypes, ListClientsRequst } from './dtos/clients';
import { ClientsERPRepository } from './repositories/clients-erp.service';
interface Cliente {
  id?: number;
  coordinatex: number;
  coordinatey: number;
}
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
  async list(query: ListClientsRequst): Promise<CLientDTO[]> {
    try {
      return await this.clientsERPRepository.list(query);
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
  async calculateDistance(): Promise<ClientTypes[]> {
    try {
      const result = await this.clientsERPRepository.calculateDistance();

      const rotaOtimizada = this.resolveTSP(result);

      return rotaOtimizada as any;
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
  calculateDistancePoint(pontoA: Cliente, pontoB: Cliente): number {
    // a fórmula euclidiana foi lógica para calcular a distância entre dois pontos cartesianos
    return Math.sqrt(
      Math.pow(pontoA.coordinatex - pontoB.coordinatex, 2) +
        Math.pow(pontoA.coordinatey - pontoB.coordinatey, 2),
    );
  }

  findNearestClient(
    pontoAtual: ClientTypes,
    pontos: ClientTypes[],
  ): ClientTypes {
    let nearestClient = pontos[0];
    let shortestDistance = this.calculateDistancePoint(
      pontoAtual,
      nearestClient,
    );

    for (const ponto of pontos) {
      const distance = this.calculateDistancePoint(pontoAtual, ponto);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestClient = ponto;
      }
    }

    return nearestClient;
  }

  resolveTSP(clientes: ClientTypes[]): ClientTypes[] {
    const route: ClientTypes[] = [];

    const valueInitial = {
      id: -1,
      coordinatex: 0,
      coordinatey: 0,
      name: 'EMPRESA',
      email: '',
      phone: '',
    };
    let pontoAtual: ClientTypes = valueInitial;
    let remainingPoints = [...clientes];

    while (remainingPoints.length > 0) {
      const nearestClient = this.findNearestClient(pontoAtual, remainingPoints);
      route.push(nearestClient);
      remainingPoints = remainingPoints.filter(
        (ponto) => ponto.id !== nearestClient.id,
      );
      pontoAtual = nearestClient;
    }

    return route;
  }
}
