import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { marked } from 'marked';
import { switchMap } from 'rxjs/operators';
import { ContentLoaderServiceService } from '../../service/content-loader-service.service';
import { HeaderComponent } from '../header/header.component';
import { Content } from '../../types/Content.model';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-detail',
	standalone: true,
	imports: [HeaderComponent, DatePipe],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

	post: Content | null = null;
	html: string | null = null;
	notFound = false;

	constructor(
		private route: ActivatedRoute,
		private contentService: ContentLoaderServiceService
	) { }

	ngOnInit(): void {
		this.route.paramMap.pipe(
			switchMap(params => {
				const slug = params.get('slug');
				return this.contentService.getAllContents().pipe(
					switchMap(contents => {
						const post = contents.find(content => content.slug === slug) ?? null;
						this.post = post;

						if (!post) {
							return [null];
						}

						return this.contentService.getContent(`${post.dir}/${post.detail}.md`);
					})
				);
			})
		).subscribe(markdown => {
			if (markdown === null) {
				this.notFound = true;
				return;
			}

			this.html = this.markdownToHtml(markdown);
		});
	}

	private static readonly METADATA_PREFIXES = ['tags:', 'date:', 'description:', 'img:'];

	private markdownToHtml(markdown: string): string {
		const body = markdown
			.split('\n')
			.filter(line => !DetailComponent.METADATA_PREFIXES.some(prefix => line.startsWith(prefix)))
			.join('\n');

		return marked.parse(body, { async: false }) as string;
	}
}
