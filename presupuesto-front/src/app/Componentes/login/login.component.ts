import { AuthService } from './../../Servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModelDTO } from 'src/app/DTOs/loginModel.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public error: string = '';

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.formLogin = this._formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  iniciarSecion(): void {
    if (this.formLogin.invalid) {
      this.error = 'Completa todos los campos';
      return;
    }

    const modelo: LoginModelDTO = {
      usuario: this.formLogin.value.usuario,
      contrasena: this.formLogin.value.contrasena
    };

    this._authService.login(modelo).subscribe({
      next: (res) => {
        this._authService.setToken(res.token);

        this._router.navigate(['/mantenimientos']);
      },
      error: (err) => {
        this.error = 'Usuario o contraseña incorrectos';
        console.error(err);
      }
    });
  }

}
