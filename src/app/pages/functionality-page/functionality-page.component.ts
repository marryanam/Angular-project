import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-functionality-page',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './functionality-page.component.html',
  styleUrl: './functionality-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionalityPageComponent {
  totalItems = 100; // Загальна кількість елементів
  itemsPerPage = 10; // Елементів на сторінку
  currentPage = 1; // Поточна сторінка
  items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  get paginatedItems(): string[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
  }
}
