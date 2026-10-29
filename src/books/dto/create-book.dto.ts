import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsISBN,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(1)
  @Max(new Date().getFullYear())
  publishedYear: number;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsISBN()
  isbn: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  genres: string[];
}
