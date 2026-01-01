import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FondoMonetarioService } from 'src/app/Servicios/fondoMonetario.service';

@Component({
  selector: 'app-eliminar-fondo-monetario',
  templateUrl: './eliminar-fondo-monetario.component.html',
  styleUrls: ['./eliminar-fondo-monetario.component.scss']
})
export class EliminarFondoMonetarioComponent implements OnInit {

  constructor(
    private _fondoMonetarioService: FondoMonetarioService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EliminarFondoMonetarioComponent>,
    @Inject(MAT_DIALOG_DATA) public idFondoMonetario: number
  ) { }

  ngOnInit(): void {
  }

  public cancelar(): void {
    this.dialogRef.close(false);
  }

  aceptar(): void {
    this._fondoMonetarioService.eliminar(this.idFondoMonetario).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.mostrarMensaje('Error al cargar los datos', 'error');
        console.error(err);
      }
    })
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
