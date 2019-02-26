import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormularioServicioComponent } from './modulo/servicios/formulario-servicio/formulario-servicio.component';
import { ListServicioComponent } from './modulo/servicios/list-servicio/list-servicio.component';
import { ServiciosComponent } from './modulo/servicios/servicios.component';
import { ServiciosService } from './modulo/servicios/servicios.service';



const rutas: Route[] = [
	{ path: "", component: ServiciosComponent },
	{ path: "categoria/:categoria", component: ServiciosComponent },
	{ path: "**", redirectTo: "" }
]


@NgModule({
	declarations: [
		AppComponent,
		ServiciosComponent,
		FormularioServicioComponent,
		ListServicioComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		NgbModule,
		RouterModule.forRoot(rutas)

	],
	providers: [ServiciosService],
	bootstrap: [AppComponent]
})

export class AppModule { }
