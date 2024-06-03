import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterconsultaComponent } from './add-interconsulta.component';

describe('AddInterconsultaComponent', () => {
  let component: AddInterconsultaComponent;
  let fixture: ComponentFixture<AddInterconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInterconsultaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInterconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
