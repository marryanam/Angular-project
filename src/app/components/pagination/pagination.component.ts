import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PaginationComponent {
  @Input() totalItems!: number;
  @Input() itemsPerPage: number = 10; 
  @Input() currentPage: number = 1; 
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

  get pages(): number[] {
    return Array(this.totalPages)?.fill(0).map((x, i) => i + 1);
  }
}
