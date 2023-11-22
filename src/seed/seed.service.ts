import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,

    // private readonly pokemonService: PokemonService,
  ) {}


  async executedSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    // const insertPromisesArray = [];
    const pokemonToInsert: { no: number, name: string }[] = [];

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no: number = +segments[ segments.length - 2 ];

      // const pokemon = await this.pokemonModel.create({no, name});
      // insertPromisesArray.push(
      //   this.pokemonModel.create({no, name})
      // );

      pokemonToInsert.push({ no, name });

    });

    // await Promise.all( insertPromisesArray );
    await this.pokemonModel.insertMany( pokemonToInsert );

    return 'Seed Executed';
  }
  
}
