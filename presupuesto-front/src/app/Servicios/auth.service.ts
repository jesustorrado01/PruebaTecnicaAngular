import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModelDTO } from '../DTOs/loginModel.dto';
import { LoginResponseDTO } from '../DTOs/loginResponse.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiUrl}/api/auth`;

  constructor( private http: HttpClient ) { }

  login(modelo: LoginModelDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.authUrl}/login`, modelo);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
