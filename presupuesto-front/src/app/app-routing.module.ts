import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Componentes/login/login.component';
import { MainLayoutComponent } from './Componentes/main-layout/main-layout.component';
import { MantenimientosComponent } from './Componentes/mantenimientos/mantenimientos.component';
import { MovimientosComponent } from './Componentes/movimientos/movimientos.component';
import { ConsultasComponent } from './Componentes/consultas/consultas.component';

import { TipoGastoComponent } from './Componentes/tipo-gasto/tipo-gasto.component';
import { FondoMonetarioComponent } from './Componentes/fondo-monetario/fondo-monetario.component';
import { PresupuestosComponent } from './Componentes/movimientos/presupuestos/presupuestos.component';
import { RegistroGastosComponent } from './Componentes/movimientos/registro-gastos/registro-gastos.component';
import { FormGastosComponent } from './Componentes/movimientos/form-gastos/form-gastos.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [

      {
        path: 'mantenimientos',
        component: MantenimientosComponent,
        children: [
          { path: 'tipo-gasto', component: TipoGastoComponent },
          { path: 'fondos-monetarios', component: FondoMonetarioComponent }
        ]
      },

      {
        path: 'movimientos',
        component: MovimientosComponent,
        children: [
          { path: 'ver-presupuestos', component: PresupuestosComponent },
          { path: 'ver-gastos', component: RegistroGastosComponent }
        ]
      },

      { path: 'consultas', component: ConsultasComponent },
      { path: 'formGastos', component: FormGastosComponent }

    ]
  },

  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
