import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteModel } from '.././models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  readonly serviceUrl = environment.serviceUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ClienteModel[]>{
    return this.http.get<ClienteModel[]>(`${this.serviceUrl}/Cliente`);
  }

  save(usuario: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(`${this.serviceUrl}/Cliente`, usuario);
  }

  update(usuario: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.serviceUrl}/Cliente`, usuario);
  }

  delete(id: number): Observable<ClienteModel> {
    return this.http.delete<ClienteModel>(`${this.serviceUrl}/Cliente/${id}`);
  }
}
