import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'post/:slug', component: DetailComponent }
];
