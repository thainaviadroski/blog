import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentLoaderServiceService } from '../../service/content-loader-service.service';
import { Content } from '../../types/Content.model';
import { PostComponent } from "../post/post.component";
import { HeaderComponent } from "../header/header.component";

const PAGE_SIZE = 5;

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [PostComponent, HeaderComponent, RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	allPosts: Content[] = [];
	pagedPosts: Content[] = [];
	currentPage = 1;
	totalPages = 1;
	searchTerm = '';

	constructor(
		private contentService: ContentLoaderServiceService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.contentService.getAllContents().subscribe(response => {
			this.allPosts = response;

			this.route.queryParamMap.subscribe(params => {
				this.searchTerm = params.get('q') ?? '';

				const filteredPosts = this.filterPosts(this.allPosts, this.searchTerm);
				this.totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

				const requestedPage = Number(params.get('page')) || 1;
				this.currentPage = Math.min(Math.max(requestedPage, 1), this.totalPages);

				const start = (this.currentPage - 1) * PAGE_SIZE;
				this.pagedPosts = filteredPosts.slice(start, start + PAGE_SIZE);
			});
		});
	}

	goToPage(page: number) {
		if (page < 1 || page > this.totalPages || page === this.currentPage) {
			return;
		}

		this.router.navigate([], { queryParams: { page }, queryParamsHandling: 'merge' });
	}

	private filterPosts(posts: Content[], term: string): Content[] {
		if (!term) {
			return posts;
		}

		const normalizedTerm = this.normalize(term);

		return posts.filter(post =>
			this.normalize(post.title).includes(normalizedTerm) ||
			this.normalize(post.description).includes(normalizedTerm) ||
			post.tags.some(tag => this.normalize(tag).includes(normalizedTerm))
		);
	}

	private normalize(value: string): string {
		return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
	}
}
