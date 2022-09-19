import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsDefined()
  @ApiProperty({ description: 'Название книги' })
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @ApiProperty({ description: 'Описание' })
  description?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsDefined()
  @ApiProperty({ description: 'Авторы' })
  authors: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({ description: 'Обложка' })
  fileCover?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({ description: 'Файл книги' })
  fileBook?: string;
}
