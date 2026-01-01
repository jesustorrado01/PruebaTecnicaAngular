import { ReportesDTO } from './../DTOs/reportes.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl = `${environment.apiUrl}/api/presupuesto/reportes`;

  constructor(private http: HttpClient) { }

  obtenerTodos(fechaInicio: Date | string, fechaFin: Date | string): Observable<ReportesDTO[]> {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const params = new HttpParams()
      .set('fechaInicio', inicio.toISOString())
      .set('fechaFin', fin.toISOString());

    return this.http.get<ReportesDTO[]>(`${this.baseUrl}/movimientos`, { params });
  }

}
