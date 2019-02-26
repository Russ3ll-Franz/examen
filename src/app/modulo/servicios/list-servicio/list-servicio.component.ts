import { Component, Input, OnInit } from '@angular/core';
import { IServicios } from 'src/app/model/servicios';
import { ServiciosService } from '../servicios.service';

@Component({
	selector: 'app-list-servicio',
	templateUrl: './list-servicio.component.html',
	styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent implements OnInit {

	@Input() servicio: IServicios

	constructor(private servicioService: ServiciosService) {
	}

	ngOnInit() { }
	editar(evt) {
		evt.preventDefault()
		this.servicioService.onEditar.emit(this.servicio.id)
	}

	eliminar(evt) {
		evt.preventDefault()
		if (confirm("¿Está seguro?")) {
			this.servicioService.eliminar(this.servicio.id)
				.subscribe(
					respuesta => this.servicioService.onActualizar.emit()
				)
		}
	}


}
