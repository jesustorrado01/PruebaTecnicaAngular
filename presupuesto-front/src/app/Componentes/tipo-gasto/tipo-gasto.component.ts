import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TipoGastoDTO } from 'src/app/DTOs/tipoGasto.dto';
import { TipoGastoService } from 'src/app/Servicios/tipoGasto.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarTipoGastosComponent } from '../mantenimientos/editar-tipo-gastos/editar-tipo-gastos.component';
import { EliminarTipoGastosComponent } from '../mantenimientos/eliminar-tipo-gastos/eliminar-tipo-gastos.component';

@Component({
  selector: 'app-tipo-gasto',
  templateUrl: './tipo-gasto.component.html',
  styleUrls: ['./tipo-gasto.component.scss']
})
export class TipoGastoComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'acciones'
  ];
  dataSource = new MatTableDataSource<TipoGastoDTO>();

  constructor(
    private _tipoGastoService: TipoGastoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarTipoGastos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public cargarTipoGastos(): void {
    this._tipoGastoService.obtenerTodos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  editar(tipoGasto?: TipoGastoDTO) {
    this.dialog.open(EditarTipoGastosComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '880px',
      autoFocus: false,
      panelClass: 'dialog-responsive',
      data: tipoGasto
    }).afterClosed().subscribe(() => {
      this.cargarTipoGastos();
    });
  }

  eliminar(idTipoGasto: number) {
    this.dialog.open(EliminarTipoGastosComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '880px',
      autoFocus: false,
      panelClass: 'dialog-responsive',
      data: idTipoGasto
    }).afterClosed().subscribe(() => {
      this.cargarTipoGastos();
    });
  }


}
