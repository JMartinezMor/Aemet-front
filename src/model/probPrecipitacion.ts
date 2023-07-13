export class ProbPrecipitacion {
  private _value: number;
  private _periodo: string;


  constructor() {
    this._value = -1;
    this._periodo = '';
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get periodo(): string {
    return this._periodo;
  }

  set periodo(value: string) {
    this._periodo = value;
  }
}
