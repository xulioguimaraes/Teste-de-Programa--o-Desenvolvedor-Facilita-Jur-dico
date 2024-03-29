import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CLientDTO, ClientTypes, ListClientsRequst } from './dtos/clients';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @ApiTags('Clientes')
  @ApiResponse({
    status: 201,
    description: 'Criação de usuarios',
  })
  @Post('/')
  async create(
    @Body()
    body: CLientDTO,
  ): Promise<void> {
    return this.clientsService.create(body);
  }

  @ApiTags('Clientes')
  @ApiResponse({
    status: 200,
    description: 'Listagem de usuarios',
  })
  @Get('/')
  async list(@Query() query: ListClientsRequst): Promise<CLientDTO[]> {
    return this.clientsService.list(query);
  }

  @ApiTags('Clientes')
  @ApiResponse({
    status: 200,
    description: 'Deletar usuario',
  })
  @Get('/calculate')
  async calculateDistance(): Promise<ClientTypes[]> {
    return await this.clientsService.calculateDistance();
  }

  @ApiTags('Clientes')
  @ApiResponse({
    status: 200,
    description: 'Obtendo um usuarios',
  })
  @Get('/:id')
  async find(@Param('id') id: string): Promise<CLientDTO> {
    return this.clientsService.find(id);
  }

  @ApiTags('Clientes')
  @ApiResponse({
    status: 200,
    description: 'Atualizção de usuarios',
  })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body()
    body: CLientDTO,
  ): Promise<void> {
    await this.clientsService.update(id, body);
  }

  @ApiTags('Clientes')
  @ApiResponse({
    status: 200,
    description: 'Deletar usuario',
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.clientsService.delete(id);
  }
}
