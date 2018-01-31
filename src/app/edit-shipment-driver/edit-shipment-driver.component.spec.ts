import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShipmentDriverComponent } from './edit-shipment-driver.component';

describe('EditShipmentDriverComponent', () => {
  let component: EditShipmentDriverComponent;
  let fixture: ComponentFixture<EditShipmentDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShipmentDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShipmentDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
