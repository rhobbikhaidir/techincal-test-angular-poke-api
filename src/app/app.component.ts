import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './app.service';
import { ResponsePokemonProps, ResultPokemonProps, TypePokemonsProps } from './app.types';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './shared/modal/modal.component';
import { LoadingComponent } from './shared/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fe-poke-api';
  pokemons: any[] = [];
  limit = 10;
  offset = 0;
  currPage = 1;
  maxData = 151;
  totalPage = Math.ceil(this.maxData / this.limit)
  isLoading = true;
  animal = 'lion';
  name = 'jhon'
  dialog = inject(MatDialog);

  constructor(private pokeService: PokemonService, private http: HttpClient) {

  }




  ngOnInit(): void {
    console.log(this.limit, '***ini limit')
    console.log(this.currPage, '***ini currPage')

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
      this.totalPage = Math.min(Math.ceil(this.maxData / this.limit), 15);


      console.log(Math.min(Math.ceil(this.maxData / this.limit), 15), '****ini maxPageeee ')


      const detailRes = res?.results?.map((el: ResultPokemonProps) => this.http.get(el?.url))
      forkJoin(detailRes).subscribe(fullData => {

        console.log(fullData, "***fullData")
        this.pokemons = fullData
      });
      this.isLoading = false;
    });
  }

  numPoke(number: number) {
    const dinamicNum = (this.currPage - 1) * this.limit + number;
    const hastag = '#';
    const formatNum = `${hastag} ${dinamicNum?.toString().padStart(3, '0')}`
    return formatNum
  }


  getColorPoke(types: TypePokemonsProps[]) {
    let type = types[0]?.type.name
    let color = "#A9A9A9"
    const listColor = [
      {
        type: 'grass',
        color: '#90EE90'
      },
      {
        type: 'fire',
        color: '#FFA500'
      },
      {
        type: 'water',
        color: '#70ffea'
      },
      {
        type: 'normal',
        color: '#fcca46'
      },
      {
        type: 'poison',
        color: '#adff2f'
      },
      {
        type: 'electric',
        color: '#FFFF00'
      },
      {
        type: 'ground',
        color: '#A9A9A9'
      },
      {
        type: 'fairy',
        color: '#FFC0CB'
      },
      {
        type: 'psychic',
        color: '#7c7db6'
      },
    ]

    const hasColor = listColor.find((item) => item.type === type)?.color
    if (hasColor) color = hasColor

    return {
      bg: color,
      border: ` 1px solid ${color}`
    }
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }




  typeLabel(types: TypePokemonsProps[]) {
      const names = types.map((el) => this.capitalize(el.type.name));
      const label = names.length > 1 ? names.join("/") : names[0]
      return label;

  }


  nextPage() {
    if (this.currPage < this.totalPage) {
      this.getPokemon(this.currPage + 1);
    }
  }

  prevPage() {
    if (this.currPage > 1) {
      this.getPokemon(this.currPage - 1);
    }
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

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '750px',
      data: {id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result)
      }
    });
  }



}
