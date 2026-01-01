import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FondoMonetarioDTO } from '../DTOs/fondoMonetario.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FondoMonetarioService {

  private baseUrl = `${environment.apiUrl}/api/presupuesto/fondomonetario`;

  constructor(private http: HttpClient) { }

  // Obtener todos
  obtenerTodos(): Observable<FondoMonetarioDTO[]> {
    return this.http.get<FondoMonetarioDTO[]>(`${this.baseUrl}/obtenerTodos`);
  }

  // Obtener por id
  obtenerPorId(id: number): Observable<FondoMonetarioDTO> {
    return this.http.get<FondoMonetarioDTO>(`${this.baseUrl}/obtener/${id}`);
  }

  // Crear o actualizar
  crearActualizar(modelo: FondoMonetarioDTO): Observable<FondoMonetarioDTO> {
    return this.http.post<FondoMonetarioDTO>(`${this.baseUrl}/crearActualizar`, modelo);
  }

  // Eliminar
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}
