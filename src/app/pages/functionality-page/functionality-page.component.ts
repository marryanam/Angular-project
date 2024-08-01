import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../models/interfaces';

@Component({
  selector: 'app-functionality-page',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './functionality-page.component.html',
  styleUrl: './functionality-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionalityPageComponent {
  first: number = 0;

  rows: number = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
