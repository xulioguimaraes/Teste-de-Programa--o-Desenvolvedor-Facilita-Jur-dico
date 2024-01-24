import { CLientDTO } from '../dtos/clients';

export abstract class ClientsERPRepository {
  abstract create(data: CLientDTO): Promise<void>;
  abstract update(id: string, data: CLientDTO): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract find(id: string): Promise<CLientDTO>;
  abstract list(): Promise<CLientDTO[]>;
}
