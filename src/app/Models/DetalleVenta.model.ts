import { ProductoModel } from "./Producto.model";

export interface DetalleVentaModel {
  idDetalleVenta: number;
  idVenta: number;
  idProducto: number;
  cantidad: number;
  total: number;
}
