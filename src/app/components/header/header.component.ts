import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentSearch = '';
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

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
