import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IServicios } from 'src/app/model/servicios';
import { ServiciosService } from './servicios.service';

@Component({
	selector: 'servicios',
	templateUrl: './servicios.component.html',
	styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
	servicios: IServicios[]
	categoria: string = ""

	constructor(private rutaActiva: ActivatedRoute, private servicioService: ServiciosService) { }

	ngOnInit() {
		merge(this.rutaActiva.paramMap, this.servicioService.onActualizar)
			.pipe(
				switchMap((pars: any) => {
					if (pars) this.categoria = pars.params.categoria ? pars.params.categoria : ""
					return this.servicioService.listar(this.categoria)
				})
			)
			.subscribe(
				elementos => this.servicios = elementos
			)
	}
}
