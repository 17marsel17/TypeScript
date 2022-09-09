import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Название книги' })
  title: string;

  @ApiProperty({ description: 'Описание' })
  description?: string;

  @ApiProperty({ description: 'Авторы' })
  authors: string;

  @ApiProperty({ description: 'Обложка' })
  fileCover?: string;

  @ApiProperty({ description: 'Файл книги' })
  fileBook?: string;
}
