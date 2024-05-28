import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialCodeComponent } from './serial-code.component';

describe('SerialCodeComponent', () => {
  let component: SerialCodeComponent;
  let fixture: ComponentFixture<SerialCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerialCodeComponent]
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
