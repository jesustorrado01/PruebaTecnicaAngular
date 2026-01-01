import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoGastoDTO } from 'src/app/DTOs/tipoGasto.dto';
import { TipoGastoService } from 'src/app/Servicios/tipoGasto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-tipo-gastos',
  templateUrl: './editar-tipo-gastos.component.html',
  styleUrls: ['./editar-tipo-gastos.component.scss']
})
export class EditarTipoGastosComponent implements OnInit {
  public formTipoGasto: FormGroup;
  public tituloAccion: string = 'Guardar'

  constructor(
    private _tipoGastosServices: TipoGastoService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarTipoGastosComponent>,
    @Inject (MAT_DIALOG_DATA) public data: TipoGastoDTO
  ) {
    this.formTipoGasto = _formBuilder.group({
      idTipoGasto: [0],
      nombre: [''],
      descripcion: ['']
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.tituloAccion = 'Actualizar';
      this.formTipoGasto.patchValue({
        idTipoGasto: this.data.idTipoGasto,
        nombre: this.data.nombre,
        descripcion: this.data.descripcion
      })
    } else {
      this.tituloAccion = 'Guardar';
    }
  }

  public accionPrincipal(): void {
    if (this.tituloAccion === 'Guardar') {
      this.crearTipoGasto();
    } else {
      this.actualizarTipoGasto();
    }
  }

  public crearTipoGasto(): void {
    if (this.formTipoGasto.invalid) {
      this.mostrarMensaje('Formulario incompleto', 'warning')
      return;
    }

    const modelo: TipoGastoDTO = {
      idTipoGasto: 0,
      nombre: this.formTipoGasto.value.nombre,
      descripcion: this.formTipoGasto.value.descripcion
    };

    this._tipoGastosServices.crearActualizar(modelo).subscribe({
      next: () => {
        this.mostrarMensaje('Datos cargados con éxito', 'success');
        this.dialogRef.close(true)
      },
      error: (err) => {
        this.mostrarMensaje('Error al cargar los datos', 'error');
        console.error(err);
      }
    });
  }

  public actualizarTipoGasto(): void {
    if (this.formTipoGasto.invalid) {
      this.mostrarMensaje('Formulario incompleto', 'warning')
      return;
    }

    const modelo: TipoGastoDTO = {
      idTipoGasto: this.formTipoGasto.value.idTipoGasto ?? 0,
      nombre: this.formTipoGasto.value.nombre,
      descripcion: this.formTipoGasto.value.descripcion,
    };

    this._tipoGastosServices.crearActualizar(modelo).subscribe({
      next: () => {
        this.mostrarMensaje('Datos cargados con éxito', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.mostrarMensaje('Error al cargar los datos', 'error');
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
