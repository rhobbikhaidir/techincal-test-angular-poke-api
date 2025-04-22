import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './app.service';
import { ResponsePokemonProps, ResultPokemonProps } from './app.types';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fe-poke-api';
  pokemons: any[] = [];
  limit = 20;
  offset = 0;
  currPage = 1;
  maxData = 151;
  totalPage = Math.ceil(this.maxData / this.limit)
  isLoading = true;
  showModal = false;



  testingMap = [1, 2, 3, 4, 5];

  fruits = [
    { name: 'bulbasaur', number: 1 },
    { name: 'charmander', number: 4 },
    { name: 'squirtle', number: 7 }
  ];


  // amountPage = Array(this.totalPage)
  //   .fill(0)
  //   .map((_, i) => i + 1);




  constructor(private pokeService: PokemonService, private http: HttpClient) {

  }




  ngOnInit(): void {
    this.getPokemon(this.currPage);
    this.formatAmountPage()
  }


  getPokemon(page: number) {

    this.isLoading = true;
    this.currPage = page;
    this.offset = (page - 1) * this.limit;

    this.pokeService.getAllPokemonWithAbilities(this.limit, this.offset).subscribe((res: ResponsePokemonProps) => {
      console.log(Math.ceil(res?.count / this.limit), 'INI TOTAL PPAGE')
      console.log(res.results?.length, 'ini lengthh')


      const detailRes = res?.results?.map((el: ResultPokemonProps) => this.http.get(el?.url))
      forkJoin(detailRes).subscribe(fullData => {

        console.log(fullData, "***fullData")
        this.pokemons = fullData
        this.isLoading = false;
      });


      // this.isLoading = false;
    });
  }

  numPoke(number?: number) {
    const hastag = '#';
    const formatNum = `${hastag} ${number?.toString().padStart(3, '0')}`
    return formatNum
  }


  nextPage() {
    console.log(this.testingMap, 'testing map')
    // if (this.currPage < this.totalPage) {
    //   this.getPokemon(this.currPage + 1);
    // }
  }

  prevPage() {
    console.log(this.pokemons, 'ini pokemon')
    // if (this.currPage > 1) {
    //   this.getPokemon(this.currPage - 1);
    // }
  }


  formatAmountPage() {
    const maxPagePershow = 5
    let start = Math.max(this.currPage - Math.floor(maxPagePershow / 2), 1);
    let end = start + maxPagePershow - 1;

    console.log(start, 'start')
    console.log(end, 'end')
    console.log(Math.floor(maxPagePershow / 2), 'mathFloor')


    if (end > this.totalPage) {
      end = this.totalPage;
      start = Math.max(end - maxPagePershow + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }


    console.log(pages, "totalPages")
    return pages;
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }




}
