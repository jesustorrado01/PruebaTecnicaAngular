import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EditarTipoGastosComponent } from './editar-tipo-gastos/editar-tipo-gastos.component';
import { EliminarTipoGastosComponent } from './eliminar-tipo-gastos/eliminar-tipo-gastos.component';
import { TipoGastoComponent } from '../tipo-gasto/tipo-gasto.component';
import { FondoMonetarioComponent } from '../fondo-monetario/fondo-monetario.component';
import { MantenimientosComponent } from './mantenimientos.component';
import { EditarCrearFondoMonetarioComponent } from './editar-crear-fondo-monetario/editar-crear-fondo-monetario.component';
import { EliminarFondoMonetarioComponent } from './eliminar-fondo-monetario/eliminar-fondo-monetario.component';

@NgModule({
  declarations: [
    EditarTipoGastosComponent,
    EliminarTipoGastosComponent,
    TipoGastoComponent,
    FondoMonetarioComponent,
    MantenimientosComponent,
    EditarCrearFondoMonetarioComponent,
    EliminarFondoMonetarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  exports: [
    MantenimientosComponent
  ]
})
export class MantenimientosModule { }
