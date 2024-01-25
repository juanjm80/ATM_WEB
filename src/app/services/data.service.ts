import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getVerificar(login: any): Observable<any>{
    let api_url = `/api/Tarjeta/VerificarTarjeta`;
    return this.http.post<any>(api_url, login);
  }

  getLogin(login: any): Observable<any>{
    let api_url = `/api/Tarjeta/Autenticar`;
    return this.http.post<any>(api_url, login);
  }
  
  setBloquear(login: any): Observable<any>{
    let api_url = `/api/Tarjeta/BloquearTarjeta`;
    return this.http.post<any>(api_url, login);
  }

  setRetiro(login: any): Observable<any>{
    let api_url = `/api/Tarjeta/RetirarDinero`;
    return this.http.post<any>(api_url, login);
  }
}
