import { Component, OnInit } from '@angular/core';
import { FondoMonetarioService } from 'src/app/Servicios/fondoMonetario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FondoMonetarioDTO } from 'src/app/DTOs/fondoMonetario.dto';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, AfterViewInit } from '@angular/core';
import { EditarCrearFondoMonetarioComponent } from '../mantenimientos/editar-crear-fondo-monetario/editar-crear-fondo-monetario.component';
import { EliminarFondoMonetarioComponent } from '../mantenimientos/eliminar-fondo-monetario/eliminar-fondo-monetario.component';

@Component({
  selector: 'app-fondo-monetario',
  templateUrl: './fondo-monetario.component.html',
  styleUrls: ['./fondo-monetario.component.scss']
})
export class FondoMonetarioComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'nombre',
    'tipo',
    'descripcion',
    'acciones'
  ];
  dataSource = new MatTableDataSource<FondoMonetarioDTO>();

  constructor(
    private _fondoMonetarioService: FondoMonetarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarFondosMonetarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarFondosMonetarios(): void {
    this._fondoMonetarioService.obtenerTodos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error al cargar Fondos monetarios', err);
      }
    });
  }

  editar(fondoMonetario?: FondoMonetarioDTO): void {
    this.dialog.open(EditarCrearFondoMonetarioComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '880px',
      autoFocus: false,
      panelClass: 'dialog-responsive',
      data: fondoMonetario
    }).afterClosed().subscribe(() => {
      this.cargarFondosMonetarios();
    });
  }

  eliminar(idFondoMonetario: number): void {
    this.dialog.open(EliminarFondoMonetarioComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '880px',
      autoFocus: false,
      panelClass: 'dialog-responsive',
      data: idFondoMonetario
    }).afterClosed().subscribe(() => {
      this.cargarFondosMonetarios();
    });
  }

}
