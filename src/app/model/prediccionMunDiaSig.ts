import { ProbPrecipitacion} from "./probPrecipitacion";

export class PrediccionMunDiaSig {
  private _mediaTemperatura: number;
  private _unidadTemperatura: string;
  private _probPrecipitacion: ProbPrecipitacion[];


  constructor() {
    this._mediaTemperatura = -1;
    this._unidadTemperatura = '';
    this._probPrecipitacion = [];
  }


  get mediaTemperatura(): number {
    return this._mediaTemperatura;
  }

  set mediaTemperatura(value: number) {
    this._mediaTemperatura = value;
  }

  get unidadTemperatura(): string {
    return this._unidadTemperatura;
  }

  set unidadTemperatura(value: string) {
    this._unidadTemperatura = value;
  }

  get probPrecipitacion(): ProbPrecipitacion[] {
    return this._probPrecipitacion;
  }

  set probPrecipitacion(value: ProbPrecipitacion[]) {
    this._probPrecipitacion = value;
  }
}
