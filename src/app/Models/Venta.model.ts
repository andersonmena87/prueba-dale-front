import { DetalleVentaModel } from "./DetalleVenta.model";

export interface VentaModel {
  idVenta: number;
  idCliente: number;
  idUsuario: number;
  detalleVent: DetalleVentaModel;
}
