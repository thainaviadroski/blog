import { Injectable, computed, effect, signal } from '@angular/core';

const STORAGE_KEY = 'theme';
type Theme = 'light' | 'dark';

/*
 * Same behaviour as the portfolio's theme.js (both sites share the origin, and
 * so this localStorage key): with no saved choice the site follows the system
 * theme; picking the theme the system already uses clears the saved choice.
 * The saved choice is applied before Angular boots by the inline script in
 * index.html, to avoid a flash of the wrong theme.
 */
@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private readonly prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
	private readonly systemTheme = signal<Theme>(this.prefersDark.matches ? 'dark' : 'light');
	private readonly savedTheme = signal<Theme | null>(this.getSavedTheme());

	readonly theme = computed(() => this.savedTheme() ?? this.systemTheme());

	constructor() {
		this.prefersDark.addEventListener('change', event => {
			this.systemTheme.set(event.matches ? 'dark' : 'light');
		});

		effect(() => {
			const saved = this.savedTheme();
			const root = document.documentElement;

			if (saved) {
				root.setAttribute('data-theme', saved);
			} else {
				root.removeAttribute('data-theme');
			}

			try {
				if (saved) {
					localStorage.setItem(STORAGE_KEY, saved);
				} else {
					localStorage.removeItem(STORAGE_KEY);
				}
			} catch {
				// localStorage unavailable (e.g. private browsing) — theme just won't persist
			}

			// Keep the mobile browser bar the same colour as the active theme's background
			this.theme();
			const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
			document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute('content', bg));
		});
	}

	toggle(): void {
		const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
		this.savedTheme.set(next === this.systemTheme() ? null : next);
	}

	private getSavedTheme(): Theme | null {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === 'light' || stored === 'dark') {
				return stored;
			}
		} catch {
			// localStorage unavailable — follow the system theme
		}

		return null;
	}
}
