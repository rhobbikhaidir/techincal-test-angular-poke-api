
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { AbilitiesPokemonProps, DetailListProps, TypePokemonsProps } from '../../app.types';

export interface DialogData {
  id: number
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
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  isLoading = true;
  detailList: DetailListProps[] = []

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

  



  getSpecies() {
    this.pokeService.getDetailPokemon(this.data.id).subscribe((res) => {
      this.isLoading = false;
      const tempDetail: DetailListProps[] = [{
        name: this.capitalize(res?.name),
        abilities: this.abilitiesLabel(res?.abilities),
        height: res?.height,
        weight: res?.weight,
        type: this.typeLabel(res?.types)
      }]

      this.detailList = tempDetail;
      console.log(res, 'ini response')
    })
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}