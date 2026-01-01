import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoGastoDTO } from '../DTOs/tipoGasto.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {

  private baseUrl = `${environment.apiUrl}/api/presupuesto/tipogasto`;

  constructor(private http: HttpClient) { }

  // Obtener todos
  obtenerTodos(): Observable<TipoGastoDTO[]> {
    return this.http.get<TipoGastoDTO[]>(`${this.baseUrl}/obtenerTodos`);
  }

  // Obtener por id
  obtenerPorId(id: number): Observable<TipoGastoDTO> {
    return this.http.get<TipoGastoDTO>(`${this.baseUrl}/obtener/${id}`);
  }

  // Crear o actualizar
  crearActualizar(modelo: TipoGastoDTO): Observable<TipoGastoDTO> {
    return this.http.post<TipoGastoDTO>(`${this.baseUrl}/crearActualizar`, modelo);
  }

  // Eliminar
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
