import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../Services/countries.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries: any[];
  filteredCountries: any[];
  pageNumber = 1;
  countriesPerPage = 10;
  totalNumberOfPages;
  filterInput;
  currentCountries: any[] = [];
  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    this.countriesService.getCountries().subscribe(data => {
      this.countries = data;
      this.filteredCountries = data;
      this.initPages();
    });
  }

  initPages() {
    const index = (this.pageNumber - 1) * 10;
    this.totalNumberOfPages = Math.ceil(this.filteredCountries.length / this.countriesPerPage);
    this.currentCountries = [];
    for (let x = index; x < index + this.countriesPerPage; x++) {
      if (this.filteredCountries[x] !== undefined) {
        this.currentCountries.push(this.filteredCountries[x]);
      }
    }
  }

  changePage(input) {
    switch (input) {
      case 'prev':
        if (this.pageNumber - 1 <= 0) {
          this.pageNumber = this.totalNumberOfPages;
        } else {
          this.pageNumber--;
        }
        this.initPages();
        break;
      case 'next':
        if (this.pageNumber + 1 > this.totalNumberOfPages) {
          this.pageNumber = 1;
        } else {
          this.pageNumber++;
        }
        this.initPages();
        break;
    }
  }

  filter() {
    if (this.filterInput.length === 0) {
      this.filteredCountries = this.countries;
    } else {
      this.filteredCountries = [];
      this.countries.forEach(e => {
        if (e.name.toLowerCase().includes(this.filterInput)) {
          this.filteredCountries.push(e);
        }
      });
    }
    this.pageNumber = 1;
    this.initPages();
  }
}
