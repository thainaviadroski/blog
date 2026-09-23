import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentLoaderServiceService } from '../../service/content-loader-service.service';
import { Content } from '../../types/Content.model';
import { PostComponent } from "../post/post.component";
import { HeaderComponent } from "../header/header.component";

const PAGE_SIZE = 5;

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [PostComponent, HeaderComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	allPosts: Content[] = [];
	pagedPosts: Content[] = [];
	currentPage = 1;
	totalPages = 1;

	constructor(
		private contentService: ContentLoaderServiceService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.contentService.getAllContents().subscribe(response => {
			this.allPosts = response;
			this.totalPages = Math.max(1, Math.ceil(this.allPosts.length / PAGE_SIZE));

			this.route.queryParamMap.subscribe(params => {
				const requestedPage = Number(params.get('page')) || 1;
				this.currentPage = Math.min(Math.max(requestedPage, 1), this.totalPages);
				this.updatePagedPosts();
			});
		});
	}

	goToPage(page: number) {
		if (page < 1 || page > this.totalPages || page === this.currentPage) {
			return;
		}

		this.router.navigate([], { queryParams: { page } });
	}

	private updatePagedPosts() {
		const start = (this.currentPage - 1) * PAGE_SIZE;
		this.pagedPosts = this.allPosts.slice(start, start + PAGE_SIZE);
	}
}
