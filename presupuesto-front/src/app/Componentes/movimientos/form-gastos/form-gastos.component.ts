import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PresupuestoService } from 'src/app/Servicios/presupuesto.service';
import { FondoMonetarioService } from 'src/app/Servicios/fondoMonetario.service';
import { ListarFondoMonetario } from 'src/app/DTOs/fondoMonetario.dto';
import { map } from 'rxjs';
import { ListarTipoGasto } from 'src/app/DTOs/tipoGasto.dto';
import { TipoGastoService } from 'src/app/Servicios/tipoGasto.service';
import { GastoDetalleDTO, RegistroGastoDTO } from 'src/app/DTOs/registroGasto.dto';

@Component({
  selector: 'app-form-gastos',
  templateUrl: './form-gastos.component.html',
  styleUrls: ['./form-gastos.component.scss']
})
export class FormGastosComponent implements OnInit {

  public formGasto!: FormGroup;

  fondoMonetarioListado: ListarFondoMonetario[] = [];
  fondoMonetarioSeleccionadoId: number | null = null;
  tipoGastosListado: ListarTipoGasto[] = [];
  tipoGastoSeleccionadoId: number | null = null;


  constructor(
    private _servicePresupuesto: PresupuestoService,
        private _tipoGastoService: TipoGastoService,
    private _fondosMonetariosService: FondoMonetarioService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {
    this.formGasto = this._formBuilder.group({
      fecha: [new Date(), Validators.required],
      idFondoMonetario: [null, Validators.required],
      nombreComercio: [''],
      tipoDocumento: ['Factura'],
      observaciones: [''],

      detalles: this._formBuilder.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.cargarFondosMonetariosParaSelect();
    this.cargarTiposGastosParaSelect();
  }

  get detalles(): FormArray {
    return this.formGasto.get('detalles') as FormArray;
  }

  crearDetalle() {
    return this._formBuilder.group({
      idTipoGasto: [null, Validators.required],
      monto: [0, [Validators.required, Validators.min(1)]]
    });
  }

  agregarDetalle() {
    this.detalles.push(this.crearDetalle());
  }

  eliminarDetalle(index: number) {
    this.detalles.removeAt(index);
  }

  crearGasto(): void {
    if (this.formGasto.invalid || this.detalles.length === 0) {
      this.mostrarMensaje('Debe agregar al menos un detalle', 'warning');
      return;
    }

    const detalles: GastoDetalleDTO[] = this.detalles.controls.map(detalle => ({
      idTipoGasto: detalle.get('idTipoGasto')?.value,
      monto: Number(detalle.get('monto')?.value)
    }));

    const fechaRaw = new Date(this.formGasto.get('fecha')?.value);
    const fechaISO = new Date(fechaRaw.getTime() - (fechaRaw.getTimezoneOffset() * 60000)).toISOString();

    const registroGasto: RegistroGastoDTO = {
      fecha: fechaISO,
      idFondoMonetario: this.formGasto.get('idFondoMonetario')?.value,
      nombreComercio: this.formGasto.get('nombreComercio')?.value,
      observaciones: this.formGasto.get('observaciones')?.value,
      tipoDocumento: this.formGasto.get('tipoDocumento')?.value,
      detalles: detalles,
      totalGasto: detalles.reduce((total, d) => total + d.monto, 0)
    };
    console.log('Informacion: ', registroGasto);
    this._servicePresupuesto.crearGasto(registroGasto)
      .subscribe({
        next: (respuesta) => {
          this.mostrarMensaje('Gasto registrado correctamente', 'success');
          this.formGasto.reset();
          this.detalles.clear();
          this.agregarDetalle();
        },
        error: (err) => {
          console.error(err);
          const mensaje = err?.error?.message ?? 'Ocurrió un error al registrar el gasto';
          this.mostrarMensaje(mensaje, 'error');
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

  public cargarFondosMonetariosParaSelect(): void {
      this._fondosMonetariosService.obtenerTodos()
        .pipe(
          map(data => data.map(gasto => ({
            idFondoMonetario: gasto.idFondoMonetario!,
            nombre: gasto.nombre
          } as ListarFondoMonetario)))
        )
        .subscribe({
          next: (listado) => {
            console.log('Datos: ', listado);
            this.fondoMonetarioListado = listado;
          },
          error: (err) => {
            this.mostrarMensaje('error al cargar datos', 'error')
            console.error(err);
          }
        });
    }

  public cargarTiposGastosParaSelect(): void {
      this._tipoGastoService.obtenerTodos()
        .pipe(
          map(data => data.map(gasto => ({
            idTipoGasto: gasto.idTipoGasto!,
            nombre: gasto.nombre
          } as ListarTipoGasto)))
        )
        .subscribe({
          next: (listado) => {
            this.tipoGastosListado = listado;
          },
          error: (err) => {
            this.mostrarMensaje('error al cargar datos', 'error')
            console.error(err);
          }
        });
    }

}
