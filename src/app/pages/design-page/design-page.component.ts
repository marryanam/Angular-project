import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-design-page',
  standalone: true,
  imports: [PaginationComponent, RouterOutlet],
  templateUrl: './design-page.component.html',
  styleUrl: './design-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignPageComponent {
  
  totalItems = signal(this.paginationService.totalItems);
  itemsPerPage = signal(this.paginationService.itemsPerPage);
  currentPage = signal(this.paginationService.currentPage);
  items = signal(this.paginationService.items);

  constructor(private paginationService: PaginationService){

  }

  onPageChanged(number: number): void {
    this.paginationService.onPageChanged('design', number);
  }

}
