import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../models/interfaces';

@Component({
  selector: 'app-design-page',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './design-page.component.html',
  styleUrl: './design-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignPageComponent {
  
  first: number = 0;

  rows: number = 10;

  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.rows = event.rows;
  }
}
