import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getAllPokemonWithAbilities(limit = 10, offset = 0) {
    return this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}}&offset=${offset}`)
  }
}
