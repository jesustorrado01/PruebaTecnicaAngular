import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private _authSevice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    this._authSevice.logout();
    this.router.navigate(['/login']);
  }

}
