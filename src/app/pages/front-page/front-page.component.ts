import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontPageComponent {

}
