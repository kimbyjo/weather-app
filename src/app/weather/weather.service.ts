import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICurrentWeather } from 'src/app/interfaces/icurrent-weather';
import { SearchComponent } from 'src/app/search/search.component';


interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string,
    id: number
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
} 

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }


  getCurrentWeather(city: string, country: string){
    return this.httpClient.get<ICurrentWeatherData>(
    `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
    `q=${city},${country}&appid=${environment.appID}`

  ).pipe(
    map(data => 
      this.transformToICurrentWeather(data)
    )
  )

}
private transformToICurrentWeather(data: ICurrentWeatherData): 
ICurrentWeather {
  return {
    city: data.name,
    country: data.sys.country,
    date: new Date(),
    image: `http://kimbyjo.com/wp-content/uploads/2018/06/${data.weather[0].icon}.png`,
    temperature: this.convertKelvinToFahrenheit(data.main.temp),
    description: data.weather[0].description,
  }
}

private convertKelvinToFahrenheit(kelvin: number): number {
  return kelvin * 9 / 5 - 459.67
  }
}