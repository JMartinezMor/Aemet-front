import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, tap, throwError} from 'rxjs';
import {Municipio} from "../model/municipio";
import {PrediccionMunDiaSig} from "../model/prediccionMunDiaSig";

@Injectable({
  providedIn: 'root'
})
export class AemetService {
  private cache: { [key: string]: any } = {};
  constructor(private http: HttpClient) { }

  getMunicipios(): Observable<Municipio[]> {
    const cacheKey = 'municipios';

    console.log(this.cache);
    if (cacheKey in this.cache) {
      return of(this.cache[cacheKey]);
    } else {
      return this.http.get<Municipio[]>('/api/municipios').pipe(
        tap(data => this.cache[cacheKey] = data)
      );
    }
  }

  getPrediccionMunDiaSig(idMunicipio: string, unidadMedida: string): Observable<PrediccionMunDiaSig> {
    return this.http.get<PrediccionMunDiaSig>(`/api/prediccionDiaSiguiente?idMunicipio=${idMunicipio}&unidadMedida=${unidadMedida}`);
  }

}
