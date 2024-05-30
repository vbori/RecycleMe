import { Component } from '@angular/core';
import { BarcodeService } from '../services/barcode.service';

@Component({
  selector: 'app-serial-code',
  templateUrl: './serial-code.component.html',
  styleUrls: ['./serial-code.component.scss']
})
export class SerialCodeComponent {
  serialCode: string = '';
  DEFAULT = "Enter the product's serial code to get detailed recycling instructions!"
  instructions = this.DEFAULT;
  productName: string = '';
  errorMessage: string = '';

  constructor(private barcodeService: BarcodeService) { }

  onSubmit() {
    this.barcodeService.getProductInfo({barcode: this.serialCode}).subscribe(
      response => {
        this.instructions = response.data.product.instructions;
        this.productName = response.data.product.name;
        this.errorMessage = '';
      },
      error => {
        this.instructions = this.DEFAULT;
        this.productName = '';
        this.errorMessage = error.error.message;
      }
    );
  }
}
