import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Content } from '../../types/Content.model';

@Component({
	selector: 'app-post',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './post.component.html',
	styleUrl: './post.component.css',
})
export class PostComponent {
	@Input() post?: Content;
}
