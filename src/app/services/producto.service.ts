import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoModel } from '../Models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  readonly serviceUrl = environment.serviceUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(`${this.serviceUrl}/Producto`);
  }

  save(produto: ProductoModel): Observable<ProductoModel> {
    return this.http.post<ProductoModel>(`${this.serviceUrl}/Producto`, produto);
  }

  update(produto: ProductoModel): Observable<ProductoModel> {
    return this.http.put<ProductoModel>(`${this.serviceUrl}/Producto`, produto);
  }

  delete(id: number): Observable<ProductoModel> {
    return this.http.delete<ProductoModel>(`${this.serviceUrl}/Producto/${id}`);
  }
}
