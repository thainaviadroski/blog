import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from '../types/Content.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ContentLoaderServiceService {

	private content = 'assets/links.json';

	constructor(private http: HttpClient) { }


	getAllContents(): Observable<Content[]> {
		return this.http.get<Content[]>(this.content).pipe(
			map(contents => [...contents].sort((a, b) => b.date.localeCompare(a.date)))
		);
	}


	getContent(path: string): Observable<string> {
		return this.http.get(path, { responseType: 'text' });
	}
}
