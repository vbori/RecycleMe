import { Component } from '@angular/core';
import { BarcodeService } from '../services/barcode.service';
import { BarcodeFormat } from '@zxing/library';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent {
  errorMessage: string = '';
  qrResultString: string | undefined;
  serialCode: string | undefined = undefined;
  allowSuggest = false;
  selectedFile: File | null = null;
  DEFAULT = "Scan the product's barcode or upload an image of the barcode to get detailed recycling instructions!"
  instructions: string | undefined = undefined;
  productName = '';
  materials: any[] = []

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

  constructor(private barcodeService: BarcodeService,  private toastr: ToastrService) {
    this.reset();
  }

  onScanSuccess(scanResult: string) {
    this.qrResultString = scanResult;
    this.serialCode = scanResult;
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
    this.barcodeService.getProductInfo(input).subscribe({
      next: response => {
        this.instructions = response.data.product.instructions;
        this.productName = response.data.product.name;
        this.materials = response.data.product.materials;
        this.errorMessage = '';
        this.toastr.success('Find details under Product Information', 'Product found', { progressBar: true, positionClass: 'toast-bottom-right' });
      },
      error: error => {
        this.instructions = undefined;
        this.productName = '';
        this.materials = [];
        this.allowSuggest = false;
        this.serialCode = undefined;

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred.
          this.errorMessage = 'An error occurred:' + error.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          if(error.status == 0){
            this.errorMessage = 'Product is not in our system or barcode can\'t be detected. Try scanning, or enter the barcode manually.'
          }else{
            this.errorMessage = error.error.message;
            if(!!error.error.data.barcode){
              this.serialCode = error.error.data.barcode;
              this.allowSuggest = true;
            }
          }
        }
        this.toastr.error(this.errorMessage, 'Error', { progressBar: true, positionClass: 'toast-bottom-right' });
      }
    }
    );
  }

  suggest(){
    if(this.serialCode){
      this.barcodeService.suggestProduct({barcode: this.serialCode, name: this.productName}).subscribe(
        response => {
          this.toastr.success('Submitted successfully', 'Success', { progressBar: true, positionClass: 'toast-bottom-right' });
          this.reset();
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  reset(){
    this.instructions = undefined;
    this.errorMessage = '';
    this.productName = '';
    this.qrResultString = undefined;
    this.serialCode = undefined;
    this.allowSuggest = false;
    this.materials = []
  }
}
