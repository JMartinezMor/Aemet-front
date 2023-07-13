import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AemetService } from './aemet.service';
//import { Municipio } from '../../../../Aemet-ASV/Aemet-front/src/model/municipio';
//import { PrediccionMunDiaSig } from '../../../../Aemet-ASV/Aemet-front/src/model/prediccionMunDiaSig';

import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Municipio} from "../model/municipio";
import {PrediccionMunDiaSig} from "../model/prediccionMunDiaSig";

@Component({
  selector: 'aemet-root',
  templateUrl: './aemet.component.html',
  styleUrls: ['./aemet.component.css']
})
export class AemetComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  municipiosList : Municipio[] =[];
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  aemetService: AemetService;
  selectedGrados: string = 'G_CEL';
  prediccionMunDiaSig: PrediccionMunDiaSig ;
  nombreMunicipio: string = '';
  showImages = false;
  img1= "assets/img/soleado.png" ;
  img2= "assets/img/nublado.png";
  img3= "assets/img/lluvioso.png";


  constructor(aemetService: AemetService) {
    this.aemetService = aemetService;
    this.prediccionMunDiaSig =  new PrediccionMunDiaSig();
  }

  ngOnInit() {

    this.aemetService.getMunicipios().subscribe((municipios: Municipio[]) => {
      this.options = municipios.map((municipio: Municipio) => municipio.nombre);
      this.municipiosList = municipios;

    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      map(value => this._filter(value || ''))
    );
  }

  onGradosSelectionChange(event: any) {
    this.selectedGrados = event.value;
    if(this.nombreMunicipio != ''){
      const filteredMunicipio = this.municipiosList.find(municipio => municipio.nombre === this.nombreMunicipio);
      const idMunicipio = filteredMunicipio?.id ?? '';

      if (idMunicipio) {
        this.aemetService.getPrediccionMunDiaSig(idMunicipio, this.selectedGrados)
          .subscribe((prediccion: PrediccionMunDiaSig) => {
            this.prediccionMunDiaSig = prediccion;

          });
      }
    }
  }
  onMunicipioOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.nombreMunicipio = event.option.value;
    const unidadMedida = this.selectedGrados; // Ajusta la unidad de medida según tus necesidades

    const filteredMunicipio = this.municipiosList.find(municipio => municipio.nombre === event.option.value);
    const idMunicipio = filteredMunicipio?.id ?? '';

    if (idMunicipio) {
      this.aemetService.getPrediccionMunDiaSig(idMunicipio, unidadMedida)
        .subscribe((prediccion: PrediccionMunDiaSig) => {
          this.prediccionMunDiaSig = prediccion;
          this.showImages = true;
        });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getFechaManianaToString(): string {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Se suma 1 día en milisegundos

    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0'); // El mes comienza en 0, por lo que se suma 1
    const day = tomorrow.getDate().toString().padStart(2, '0');

    const tomorrowDateString = `${year}-${month}-${day}`;

    return tomorrowDateString;
  }

  sumaValor(prob: any[]): number {
    const rowCount = prob.length;
    let suma = 0;
    for (const valor of prob) {
      suma += valor.value;
    }
    return suma / rowCount;

  }

}
