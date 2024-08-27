import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CustomCursorDirective } from './directives/cursor/custom-cursor.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonModule, CustomCursorDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Angular-project';
  private audio = new Audio();
  private isAudioPlayed = false;
  isAudioPlayedManual = false;

  @HostListener('document:mousemove')
  private startAudio(): void {
    if (!this.isAudioPlayed) {
      this.audio?.play()?.then(() => {
        this.isAudioPlayed = true;
      }).catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
  }

  ngOnInit(): void {
    this.audio.src = '../assets/Michael_Vignola_-_Knowing_51058718.mp3';
    this.audio.load();
    this.audio.loop = true;

    this.audio.addEventListener('ended', () => {
      this.audio.currentTime = 0;
      this.audio?.play().catch(error => {
        console.error('Failed to replay audio:', error);
      });
    });
  }

  toggleAudio(){
    this.isAudioPlayedManual = !this.isAudioPlayedManual;
    this.isAudioPlayed = this.isAudioPlayedManual;
    if(this.isAudioPlayedManual){
      this.audio.pause();
    } else{
      this.startAudio();
    }
  }
}
