import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';

@Injectable()
export class CountriesService {

  private url;
  constructor(private http: HttpClient) {
    this.url = 'https://restcountries.eu/rest/v2/all';
  }

  getCountries() {
    return this.http.get<any[]>(this.url);
  }

}
