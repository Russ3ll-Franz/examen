import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServiciosService } from '../servicios.service';
@Component({
	selector: 'app-formulario-servicio',
	templateUrl: './formulario-servicio.component.html',
	styleUrls: ['./formulario-servicio.component.css']
})
export class FormularioServicioComponent implements OnInit {

	id: number = -1
	grupo: FormGroup
	grabando: boolean = false
	suscripcion: Subscription

	constructor(private servicioService: ServiciosService) { }

	ngOnInit() {
		this.grupo = new FormGroup({
			titulo: new FormControl(null, Validators.required),
			descripcion: new FormControl(null, Validators.required),
			categorias: new FormControl([], Validators.required)
		})
		this.suscripcion = this.servicioService.onEditar
			.pipe(
				switchMap(id => {
					this.id = id
					return this.servicioService.obtenerUno(id)
				})
			)
			.subscribe(
				elemento => {
					this.grupo.patchValue(elemento)
				}
			)
	}


	cancelar() {
		this.grupo.reset()
		this.id = -1
	}

	grabar() {
		console.log(this.grupo.getRawValue())
		this.grabando = true
		if (this.id != -1) {
			this.servicioService.actualizar(this.id, this.grupo.getRawValue())
				.subscribe(
					respuesta => {
						this.grabando = false
						this.grupo.reset()
						this.id = -1
						this.servicioService.onActualizar.emit()
					}
				)
		} else {
			this.servicioService.insertar(this.grupo.getRawValue())
				.subscribe(
					respuesta => {
						this.grabando = false
						this.grupo.reset()
						this.servicioService.onActualizar.emit()
					}
				)
		}

	}

	ngOnDestroy() {
		this.suscripcion.unsubscribe()
	}
}
