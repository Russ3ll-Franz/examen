import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";
import { IServicios } from 'src/app/model/servicios';

@Injectable({
	providedIn: 'root'
})
export class ServiciosService {

	onEditar = new EventEmitter<number>()
	onActualizar = new EventEmitter()

	private autoIncremental: number

	private servicios: IServicios[] = [
		{ id: 1, titulo: "Electricidad", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", categorias: ["autos", "hogar"] },
		{ id: 2, titulo: "Auxilio mecánico", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", categorias: ["autos"] },
		{ id: 3, titulo: "Chofer reemplazo", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", categorias: ["autos"] },
		{ id: 4, titulo: "Médico a domicilio", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", categorias: ["salud", "hogar"] },
		{ id: 5, titulo: "Ambulancia", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", categorias: ["salud", "hogar"] }
	]

	constructor() {
		this.autoIncremental = this.servicios.length + 1
	}

	listar(categoria: string): Observable<IServicios[]> {
		let els: IServicios[]

		if (categoria.trim() != "") {
			els = this.servicios.filter(el => {
				return el.categorias.indexOf(categoria) > -1
			})
		} else {
			els = this.servicios
		}
		return of(els)
			.pipe(
				delay(1000)
			)
	}

	obtenerUno(id: number): Observable<IServicios> {
		const servicio = this.servicios.find(item => item.id == id)
		return of(servicio)
			.pipe(
				delay(1000)
			)
	}

	insertar(servicio: IServicios): Observable<any> {
		servicio.id = this.autoIncremental++
		this.servicios.push(servicio)

		return of([])
			.pipe(
				delay(1000)
			)
	}

	eliminar(id: number): Observable<any> {
		const indice = this.servicios.findIndex(item => item.id == id)
		this.servicios.splice(indice, 1)

		return of([])
			.pipe(
				delay(1000)
			)
	}

	actualizar(id: number, servicio: IServicios): Observable<any> {
		const indice = this.servicios.findIndex(item => item.id == id)
		this.servicios[indice] = servicio

		return of([])
			.pipe(
				delay(1000)
			)
	}
}
