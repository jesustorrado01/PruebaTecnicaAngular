import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ListarTipoGasto } from 'src/app/DTOs/tipoGasto.dto';
import { TipoGastoService } from 'src/app/Servicios/tipoGasto.service';
import { PresupuestoDTO } from 'src/app/DTOs/presupuesto.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PresupuestoService } from 'src/app/Servicios/presupuesto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-presupuesto',
  templateUrl: './form-presupuesto.component.html',
  styleUrls: ['./form-presupuesto.component.scss']
})
export class FormPresupuestoComponent implements OnInit {

  public formPresupuesto: FormGroup;
  public tituloAccion = 'Guardar';
  tipoGastosListado: ListarTipoGasto[] = [];
  tipoGastoSeleccionadoId: number | null = null;

  constructor(
    private _tipoGastoService: TipoGastoService,
    private _presupuestoService: PresupuestoService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FormPresupuestoComponent>,
  ) {
    this.formPresupuesto = this._formBuilder.group({
      idPresupuesto: [0],
      idTipoGasto: [null, Validators.required],
      montoPresupuestado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTiposGastosParaSelect();
  }

  public crearPresupuesto(): void {
    if (this.formPresupuesto.invalid) {
      this.mostrarMensaje('Formulario incompleto', 'warning');
      return;
    }

    const modelo: PresupuestoDTO = {
      idPresupuesto: 0,
      idTipoGasto: this.formPresupuesto.value.idTipoGasto,
      montoPresupuestado: this.formPresupuesto.value.montoPresupuestado
    }

    this._presupuestoService.crear(modelo).subscribe({
      next: (res) => {
        this.mostrarMensaje('Datos cargados exitosamente', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.mostrarMensaje('Datos cargados exitosamente', 'success');
        console.error(err);
      }
    })
  }

  public cargarTiposGastosParaSelect(): void {
      this._tipoGastoService.obtenerTodos()
        .pipe(
          map(data => data.map(gasto => ({
            idTipoGasto: gasto.idTipoGasto!,
            nombre: gasto.nombre
          } as ListarTipoGasto)))
        )
        .subscribe({
          next: (listado) => {
            this.tipoGastosListado = listado;
          },
          error: (err) => {
            this.mostrarMensaje('error al cargar datos', 'error')
            console.error(err);
          }
        });
    }

  public cancelar(): void {
    this.dialogRef.close(false);
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
