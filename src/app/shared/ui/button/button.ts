import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  type = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);
  buttonClick = output();
}
