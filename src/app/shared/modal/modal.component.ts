
import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { AbilitiesPokemonProps, DetailListProps, TypePokemonsProps } from '../../app.types';

export interface DialogData {
  id: number;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './modal.component.html',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  isLoading = true;
  detailList: DetailListProps[] = []
  dataSource: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  displayedColumns: string[] = ['no', 'name'];

  constructor(private pokeService: PokemonService) {

  }

  typeLabel(types: TypePokemonsProps[]) {
    const names = types.map((el) => this.capitalize(el.type.name));
    const label = names.length > 1 ? names.join("/") : names[0]
    return label;
  }

  abilitiesLabel(types: AbilitiesPokemonProps[]) {
    const names = types.map((el) => this.capitalize(el.ability.name));
    const label = names.length > 1 ? names.join("/") : names[0]
    return label;
  }


  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnInit(): void {
    this.getSpecies()
  }


  formatMoves(moves: any[]) {
    console.log(moves, '***moves array')
    let movesList: any[] = []
    if( moves?.length > 0) {
      moves.map((res, idx) =>{
        movesList.push({
        no: idx + 1,
        name: this.capitalize(res?.move?.name)
      })
      })
    }
      return movesList
  }


  getSpecies() {
    this.pokeService.getDetailPokemon(this.data.id).subscribe((res) => {
      this.isLoading = false;
      const tempDetail: DetailListProps[] = [{
        name: this.capitalize(res?.name),
        abilities: this.abilitiesLabel(res?.abilities),
        height: res?.height,
        weight: res?.weight,
        type: this.typeLabel(res?.types),
        moves: this.formatMoves(res?.moves)
      }]
      console.log(tempDetail, 'tempDetail')


      this.detailList = tempDetail;
      console.log(res, 'ini response')
    })
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}