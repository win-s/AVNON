import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCheckBoxComponent } from './create-check-box.component';

describe('CreateCheckBoxComponent', () => {
  let component: CreateCheckBoxComponent;
  let fixture: ComponentFixture<CreateCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCheckBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
