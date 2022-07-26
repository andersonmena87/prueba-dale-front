import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VentaModel } from '../models/Venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  readonly serviceUrl = environment.serviceUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<VentaModel[]>{
    return this.http.get<VentaModel[]>(`${this.serviceUrl}/Venta`);
  }

  save(venta: VentaModel): Observable<VentaModel> {
    return this.http.post<VentaModel>(`${this.serviceUrl}/Venta`, venta);
  }

  update(venta: VentaModel): Observable<VentaModel> {
    return this.http.put<VentaModel>(`${this.serviceUrl}/Venta`, venta);
  }

  delete(id: number): Observable<VentaModel> {
    return this.http.delete<VentaModel>(`${this.serviceUrl}/Venta/${id}`);
  }
}
