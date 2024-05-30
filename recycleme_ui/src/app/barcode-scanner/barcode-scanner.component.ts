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
  instructions = '';
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

  constructor(private barcodeService: BarcodeService) { }

  onScanSuccess(scanResult: string) {
    this.qrResultString = scanResult;
    this.barcodeService.getProductInfo(scanResult).subscribe(
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
