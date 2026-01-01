import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PresupuestoService } from 'src/app/Servicios/presupuesto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroGastoDTO } from 'src/app/DTOs/registroGasto.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-registro-gastos',
  templateUrl: './registro-gastos.component.html',
  styleUrls: ['./registro-gastos.component.scss']
})
export class RegistroGastosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'fecha',
    'fondoMonetario',
    'nombreComercio',
    'tipoDocumento',
    'observaciones',
    'totalGasto',
  ];

  public dataSource = new MatTableDataSource<RegistroGastoDTO>();

  constructor(
    private _snackBar: MatSnackBar,
    private _presupuestoService: PresupuestoService
  ) { }

  ngOnInit(): void {
    this.cargarGastos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarGastos(): void {
      this._presupuestoService.obtenerTodosGastos().subscribe({
        next: (data) => {
          const gastosMapeados: RegistroGastoDTO[] = data.map(gasto => ({
            ...gasto,
            totalGasto: gasto.detalles.reduce((sum, detalle) => sum + detalle.monto, 0),
            fecha: gasto.fecha
          }));

          this.dataSource.data = gastosMapeados;
        },
        error: (err) => {
          this.mostrarMensaje('Error al cargar datos', 'error');
          console.error(err);
        }
      });
    }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'warning'): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [tipo]
    });
  }
}
