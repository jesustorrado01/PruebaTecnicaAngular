import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormPresupuestoComponent } from '../form-presupuesto/form-presupuesto.component';
import { PresupuestoService } from 'src/app/Servicios/presupuesto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PresupuestoDTO } from 'src/app/DTOs/presupuesto.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.scss']
})
export class PresupuestosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = [
    'mes',
    'tipoGasto',
    'monto',
    'fechaRegistro'
  ];
  public dataSource = new MatTableDataSource<PresupuestoDTO>();

  constructor(
    private _presupuestoService: PresupuestoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarPresupuestos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarPresupuestos(): void {
    this._presupuestoService.obtenerTodos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        this.mostrarMensaje('Error al cargar datos', 'error');
        console.error(err);
      }
    });
  }

  abrirModalPresupuesto() {
    this.dialog.open(FormPresupuestoComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '880px',
      autoFocus: false,
      panelClass: 'dialog-responsive'
    }).afterClosed().subscribe(() => {
      this.cargarPresupuestos();
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
