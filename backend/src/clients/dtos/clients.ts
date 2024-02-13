import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CLientDTO {
  id?: number;
  @IsString({
    message: 'Você deve enviar o nome do cliente',
  })
  @ApiProperty()
  name: string;

  @IsString({
    message: 'Você deve enviar o email',
  })
  @ApiProperty()
  email: string;

  @IsString({
    message: 'Você deve enviar o telefone',
  })
  @ApiProperty()
  phone: string;

  @IsString({
    message: 'Você deve enviar o endereço',
  })
  @ApiProperty()
  address: string;
  @IsNumber(
    {},
    {
      message: 'Você deve enviar a latitude',
    },
  )
  @ApiProperty()
  latitude: number;

  @IsNumber(
    {},
    {
      message: 'Você deve enviar a longitude',
    },
  )
  @ApiProperty()
  longitude: number;
}

export class ListClientsRequst {
  @ApiPropertyOptional()
  @IsString({
    message: `O campo searchTerm deve ser uma string`,
  })
  @IsOptional()
  search_term?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Page é obrigatório' })
  page: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'PerPage é obrigatório' })
  per_page: string;
}

export type ClientTypes = {
  id?: number;

  name: string;

  email: string;

  phone: string;

  distance: string;
};
