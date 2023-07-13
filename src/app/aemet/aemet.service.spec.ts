import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AemetService } from './aemet.service';
import { Municipio } from '../model/municipio';

describe('AemetService', () => {
  let service: AemetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AemetService]
    });
    service = TestBed.inject(AemetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve municipios', () => {
    const mockMunicipios: Municipio[] = [
      {
        latitud: "40.4168",
        id_old: "28079",
        url: "http://www.madrid.es",
        latitud_dec: "40.4168",
        altitud: "667",
        capital: "Madrid",
        num_hab: "3266126",
        zona_comarcal: "Madrid",
        destacada: "0",
        nombre: "Madrid",
        longitud_dec: "-3.7038",
        id: "28079",
        longitud: "-3.7038"
      },
    ];

    service.getMunicipios().subscribe((municipios: Municipio[]) => {
      expect(municipios).toEqual(mockMunicipios);
    });

    const req = httpMock.expectOne('/api/municipios');
    expect(req.request.method).toBe('GET');
    req.flush(mockMunicipios);
  });

});
