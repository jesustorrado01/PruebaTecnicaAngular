import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FondoMonetarioDTO } from 'src/app/DTOs/fondoMonetario.dto';
import { FondoMonetarioService } from 'src/app/Servicios/fondoMonetario.service';

@Component({
  selector: 'app-editar-crear-fondo-monetario',
  templateUrl: './editar-crear-fondo-monetario.component.html',
  styleUrls: ['./editar-crear-fondo-monetario.component.scss']
})
export class EditarCrearFondoMonetarioComponent implements OnInit {
  public formFondoMonetario: FormGroup;
  public tituloAccion: string = 'Guardar';

  constructor(
    private _fondoMonetarioService: FondoMonetarioService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarCrearFondoMonetarioComponent>,
    @Inject (MAT_DIALOG_DATA) public data: FondoMonetarioDTO
  ) {
    this.formFondoMonetario = _formBuilder.group({
      idFondoMonetario: [0],
      nombre: [''],
      tipo: [''],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.tituloAccion = 'Actualizar';
      this.formFondoMonetario.patchValue({
        idFondoMonetario: this.data.idFondoMonetario,
        nombre: this.data.nombre,
        tipo: this.data.tipo,
        descripcion: this.data.descripcion
      });
    } else {
      this.tituloAccion = 'Guardar';
    }
  }

  public accionPrincipal(): void {
    if (this.tituloAccion === 'Guardar') {
      this.crearFondoMonetario();
    } else {
      this.actualizarFondoMonetario();
    }
  }

  crearFondoMonetario(): void {
    if (this.formFondoMonetario.invalid) {
      this.mostrarMensaje('Formulario incompleto', 'warning')
      return;
    }

    const modelo: FondoMonetarioDTO = {
      idFondoMonetario: 0,
      nombre: this.formFondoMonetario.value.nombre,
      tipo: this.formFondoMonetario.value.tipo,
      descripcion: this.formFondoMonetario.value.descripcion
    }

    this._fondoMonetarioService.crearActualizar(modelo).subscribe({
      next: (res) => {
        this.mostrarMensaje('Datos cargados con éxito', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.mostrarMensaje('Error al cargar los datos', 'error');
        console.error(err);
      }
    });
  }

  actualizarFondoMonetario(): void {
    if (this.formFondoMonetario.invalid) {
      this.mostrarMensaje('Formulario incompleto', 'warning')
      return;
    }

    const modelo: FondoMonetarioDTO = {
      idFondoMonetario: this.formFondoMonetario.value.idFondoMonetario ?? 0,
      nombre: this.formFondoMonetario.value.nombre,
      tipo: this.formFondoMonetario.value.tipo,
      descripcion: this.formFondoMonetario.value.descripcion
    };

    this._fondoMonetarioService.crearActualizar(modelo).subscribe({
      next: () => {
        this.mostrarMensaje('Datos cargados con éxito', 'success')
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
