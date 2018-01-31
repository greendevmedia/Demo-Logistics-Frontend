import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipmentsComponent } from './add-shipments.component';

describe('AddShipmentsComponent', () => {
  let component: AddShipmentsComponent;
  let fixture: ComponentFixture<AddShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
