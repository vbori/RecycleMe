import { Component } from '@angular/core';
import { SerialService } from '../services/serial.service';

@Component({
  selector: 'app-serial-code',
  templateUrl: './serial-code.component.html',
  styleUrls: ['./serial-code.component.scss']
})
export class SerialCodeComponent {
  serialCode: string = '';
  instructions: string = '';
  errorMessage: string = '';

  constructor(private serialService: SerialService) { }

  onSubmit() {
    this.serialService.getInstructions(this.serialCode).subscribe(
      response => {
        this.instructions = response.instructions;
      },
      error => {
        this.errorMessage = 'Invalid serial code. Please try again.';
      }
    );
  }
}
