import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/Servicios/reportes.service';
import { ReportesDTO } from 'src/app/DTOs/reportes.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  public formConsultas: FormGroup;
  public movimientos: ReportesDTO[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _reportesService: ReportesService,
    private _snackBar: MatSnackBar
  ) {
    this.formConsultas = this._formBuilder.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  cargarReportes(): void {

    if (this.formConsultas.invalid) {
      this.mostrarMensaje('Datos cargados con éxito', 'warning');
      this.formConsultas.markAllAsTouched();
      return;
    }

    const { fechaInicio, fechaFin } = this.formConsultas.value;

    this._reportesService.obtenerTodos(fechaInicio, fechaFin).subscribe({
      next: (res) => {
        this.movimientos = res;
        this.mostrarMensaje('Datos cargados con éxito', 'success');
      },
      error: (err) => {
        this.mostrarMensaje('Error al cargar los datos', 'error');
        console.error(err);
      }
    });

  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'warning') {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [tipo]
    });
  }

}
