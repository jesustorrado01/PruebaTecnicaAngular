import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoGastoService } from 'src/app/Servicios/tipoGasto.service';

@Component({
  selector: 'app-eliminar-tipo-gastos',
  templateUrl: './eliminar-tipo-gastos.component.html',
  styleUrls: ['./eliminar-tipo-gastos.component.scss']
})
export class EliminarTipoGastosComponent implements OnInit {

  constructor(
    private _tipoGastosService: TipoGastoService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EliminarTipoGastosComponent>,
    @Inject(MAT_DIALOG_DATA) public idTipoGasto: number
  ) { }

  ngOnInit(): void {
  }

  public cancelar(): void {
    this.dialogRef.close(false);
  }

  public aceptar(): void {
    this._tipoGastosService.eliminar(this.idTipoGasto).subscribe({
      next: () => {
        this.dialogRef.close(true);
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
