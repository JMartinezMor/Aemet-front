import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Municipio} from "../model/municipio";
import {PrediccionMunDiaSig} from "../model/prediccionMunDiaSig";



@Injectable({
  providedIn: 'root'
})
export class AemetService {
  constructor(private http: HttpClient) { }

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`/api/municipios`);
  }

  getPrediccionMunDiaSig(idMunicipio: string, unidadMedida: string): Observable<PrediccionMunDiaSig> {
    return this.http.get<PrediccionMunDiaSig>(`/api/prediccionDiaSiguiente?idMunicipio=${idMunicipio}&unidadMedida=${unidadMedida}`);
  }


}
