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
  productName: string = '';
  errorMessage: string = '';

  constructor(private serialService: SerialService) { }

  onSubmit() {
    this.serialService.getInstructions(this.serialCode).subscribe(
      response => {
        this.instructions = response.data.product.instructions;
        this.productName = response.data.product.name;
      },
      error => {
        this.instructions = '';
        this.productName = '';
        this.errorMessage = error.error.message;
      }
    );
  }
}
