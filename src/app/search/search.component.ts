import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { FormControl } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatCardModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import { ICurrentWeather } from '../interfaces/icurrent-weather';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']

})
export class SearchComponent {
current: ICurrentWeather
cityValue = new FormControl()
countryValue = new FormControl()
constructor(private weatherService : WeatherService) { }

getWeather(city: string, country: string) {
  this.weatherService.getCurrentWeather(city, country)
  .subscribe(data => (this.current= (data)))
  }

}
