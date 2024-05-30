import { Component } from '@angular/core';
import { BarcodeService } from '../services/barcode.service';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent {
  scanResult: string = '';
  errorMessage: string = '';
  qrResultString: string | undefined;
  selectedFile: File | null = null;
  DEFAULT = "Scan the product's barcode or upload an image of the barcode to get detailed recycling instructions!"
  instructions = this.DEFAULT;
  productName = '';

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.ITF,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.PDF_417,
    BarcodeFormat.AZTEC
  ];

  constructor(private barcodeService: BarcodeService) {
    this.reset();
  }

  onScanSuccess(scanResult: string) {
    this.qrResultString = scanResult;
    this.getInfo({barcode: scanResult});
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadPhoto() {
    if (this.selectedFile) {
      this.getInfo({file: this.selectedFile});
    } else {
      this.errorMessage = 'No file selected. Please select a file.';
    }
  }

  getInfo(input: {barcode?: string, file?: File}){
    this.barcodeService.getProductInfo(input).subscribe(
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

  reset(){
    this.instructions = this.DEFAULT;
    this.errorMessage = '';
    this.productName = '';
    this.qrResultString = undefined;
  }
}
