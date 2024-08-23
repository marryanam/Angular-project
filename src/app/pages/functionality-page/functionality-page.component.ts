import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PaginationService } from '../../services/pagination/pagination.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-functionality-page',
  standalone: true,
  imports: [RouterOutlet, PaginationComponent],
  templateUrl: './functionality-page.component.html',
  styleUrl: './functionality-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionalityPageComponent {
  totalItems = signal(this.paginationService.totalItems);
  itemsPerPage = signal(this.paginationService.itemsPerPage);
  currentPage = signal(this.paginationService.currentPage);
  items = signal(this.paginationService.items);

  constructor(private paginationService: PaginationService){

  }

  onPageChanged(number: number): void {
    this.paginationService.onPageChanged('functionality', number);
  }

}
