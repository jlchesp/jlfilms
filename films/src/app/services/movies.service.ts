import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseMDB } from '../Interfaces/interfaces';

const URL = environment.url;
const APY_KEY = environment.api_key;

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private http: HttpClient) { }

  getFeature() {

    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const month = today.getMonth() + 1;
    let monthString = String(month).padStart(2, '0');

    const init = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.http.get<ResponseMDB>(`${URL}/discover/movie?primary_release_date.gte=${init}&primary_release_date.lte=${end}&${APY_KEY}`);
  }
}