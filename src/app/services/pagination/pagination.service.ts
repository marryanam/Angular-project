import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  totalItems = 100;
  itemsPerPage = 10;
  currentPage = 0;
  items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPage = 0;
    });
   }

  onPageChanged(page: string, number: number): void {
    this.currentPage = number;
    this.router.navigate([`/${page}/page-${number}`]);
  }
}
