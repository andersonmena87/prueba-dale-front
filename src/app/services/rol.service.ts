import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolModel } from '.././Models/Rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  readonly serviceUrl = environment.serviceUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<RolModel[]>{
    return this.http.get<RolModel[]>(`${this.serviceUrl}/Rol`);
  }

  save(rol: RolModel): Observable<RolModel> {
    return this.http.post<RolModel>(`${this.serviceUrl}/Rol`, rol);
  }

  update(rol: RolModel): Observable<RolModel> {
    return this.http.put<RolModel>(`${this.serviceUrl}/Rol`, rol);
  }

  delete(id: number): Observable<RolModel> {
    return this.http.delete<RolModel>(`${this.serviceUrl}/Rol/${id}`);
  }
}
