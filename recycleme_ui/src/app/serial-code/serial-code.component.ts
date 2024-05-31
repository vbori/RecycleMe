import { Component } from '@angular/core';
import { BarcodeService } from '../services/barcode.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-serial-code',
  templateUrl: './serial-code.component.html',
  styleUrls: ['./serial-code.component.scss']
})
export class SerialCodeComponent {
  serialCode: string = '';
  DEFAULT = "Enter the product's serial code to get detailed recycling instructions!"
  instructions: string | undefined = undefined;
  productName: string = '';
  errorMessage: string = '';
  materials: any[] = [];
  showDialog = false;

  constructor(private barcodeService: BarcodeService, private toastr: ToastrService) { }

  onSubmit() {
    this.barcodeService.getProductInfo({barcode: this.serialCode}).subscribe(
      response => {
        this.instructions = response.data.product.instructions;
        this.productName = response.data.product.name;
        this.materials = response.data.product.materials;
        this.errorMessage = '';
        this.toastr.success('Find details under Product Information', 'Product found', { progressBar: true, positionClass: 'toast-bottom-right' });
      },
      error => {
        this.instructions = undefined;
        this.productName = '';
        this.materials = [];
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage, 'Error', { progressBar: true, positionClass: 'toast-bottom-right' });
      }
    );
  }

  suggest(){
    this.barcodeService.suggestProduct({barcode: this.serialCode, name: this.productName}).subscribe(
      response => {
        this.toastr.success('Submitted successfully', 'Success', { progressBar: true, positionClass: 'toast-bottom-right' });
        this.errorMessage = '';
        this.productName = '';
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
