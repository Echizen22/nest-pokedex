import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

    // isInt, isPositive, min
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    // isString, Minlength
    @IsString()
    @MinLength(1)
    name: string;


}
