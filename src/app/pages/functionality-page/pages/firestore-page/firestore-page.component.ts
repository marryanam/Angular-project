import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-firestore-page',
  standalone: true,
  imports: [],
  templateUrl: './firestore-page.component.html',
  styleUrl: './firestore-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirestorePageComponent {

}
