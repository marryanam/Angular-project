import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-design-page',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './design-page.component.html',
  styleUrl: './design-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignPageComponent {
  
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
