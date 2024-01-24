import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CLientDTO {
  id?: string;
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
}
