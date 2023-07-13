export class Municipio {

  latitud: string;
  id_old: string;
  url: string;
  latitud_dec: string;
  altitud: string;
  capital: string;
  num_hab: string;
  zona_comarcal: string;
  destacada: string;
  nombre: string;
  longitud_dec: string;
  id: string;
  longitud: string;


  constructor(latitud: string, id_old: string, url: string, latitud_dec: string, altitud: string, capital: string, num_hab: string, zona_comarcal: string, destacada: string, nombre: string, longitud_dec: string, id: string, longitud: string) {
    this.latitud = latitud;
    this.id_old = id_old;
    this.url = url;
    this.latitud_dec = latitud_dec;
    this.altitud = altitud;
    this.capital = capital;
    this.num_hab = num_hab;
    this.zona_comarcal = zona_comarcal;
    this.destacada = destacada;
    this.nombre = nombre;
    this.longitud_dec = longitud_dec;
    this.id = id;
    this.longitud = longitud;
  }
}







