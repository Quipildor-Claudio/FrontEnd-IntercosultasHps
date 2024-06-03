import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicoComponent } from './add-medico.component';

describe('AddMedicoComponent', () => {
  let component: AddMedicoComponent;
  let fixture: ComponentFixture<AddMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
