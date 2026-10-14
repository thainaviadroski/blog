import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentSearch = '';

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.currentSearch = params.get('q') ?? '';
    });
  }

  onSearchSubmit(event: Event, input: HTMLInputElement): void {
    event.preventDefault();
    const value = input.value.trim();
    this.router.navigate(['/'], { queryParams: { q: value || null, page: null } });
  }
}
