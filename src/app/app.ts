import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopUp } from '@shared/ui/pop-up/pop-up';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PopUp],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('EM-movies-list');
}
