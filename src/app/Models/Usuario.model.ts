import { RolModel } from "./Rol.model";

export interface UsuarioModel {
  idUsuario: number;
  idRol: number;
  nombre: string;
  cedula: string;
  telefono: string;
  userName: string;
  password: string;
  Rol: RolModel;
}
