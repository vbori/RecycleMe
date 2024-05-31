import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SerialCodeComponent } from './serial-code.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SerialCodeComponent', () => {
  let component: SerialCodeComponent;
  let fixture: ComponentFixture<SerialCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialCodeComponent ],
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [ToastrService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerialCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
