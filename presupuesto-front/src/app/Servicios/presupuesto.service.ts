import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PresupuestoDTO } from '../DTOs/presupuesto.dto';
import { GastoDetalleDTO, RegistroGastoDTO } from '../DTOs/registroGasto.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  private baseUrl = `${environment.apiUrl}/api/presupuesto/presupuesto`;
  private baseUrlGastos = `${environment.apiUrl}/api/presupuesto/gastos`;

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<PresupuestoDTO[]> {
    return this.http.get<PresupuestoDTO[]>(`${this.baseUrl}/obtenerTodos`);
  }

  crear(modelo: PresupuestoDTO): Observable<PresupuestoDTO> {
    return this.http.post<PresupuestoDTO>(`${this.baseUrl}/crear`, modelo);
  }

  obtenerTodosGastos(): Observable<RegistroGastoDTO[]> {
    return this.http.get<RegistroGastoDTO[]>(`${this.baseUrlGastos}/obtenerTodos`);
  }

  crearGasto(modelo: RegistroGastoDTO): Observable<RegistroGastoDTO> {
    return this.http.post<RegistroGastoDTO>(`${this.baseUrlGastos}/crear`, modelo);
  }
}
