import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'theme';
type Theme = 'light' | 'dark';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	readonly theme = signal<Theme>(this.getInitialTheme());

	constructor() {
		effect(() => {
			const theme = this.theme();
			document.documentElement.setAttribute('data-theme', theme);

			try {
				localStorage.setItem(STORAGE_KEY, theme);
			} catch {
				// localStorage unavailable (e.g. private browsing) — theme just won't persist
			}
		});
	}

	toggle(): void {
		this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
	}

	private getInitialTheme(): Theme {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === 'light' || stored === 'dark') {
				return stored;
			}
		} catch {
			// localStorage unavailable — fall through to system preference
		}

		return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
}
