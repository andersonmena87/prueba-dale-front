import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly serviceUrl = environment.serviceUrl;
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(`${this.serviceUrl}/Usuario`);
  }

  saveUser(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.serviceUrl}/Usuario`, usuario);
  }

  updateUser(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.serviceUrl}/Usuario`, usuario);
  }

  deleteUser(id: number): Observable<UsuarioModel> {
    return this.http.delete<UsuarioModel>(`${this.serviceUrl}/Usuario/${id}`);
  }
}
