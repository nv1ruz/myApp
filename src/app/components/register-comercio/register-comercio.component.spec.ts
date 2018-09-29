import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComercioComponent } from './register-comercio.component';

describe('RegisterComercioComponent', () => {
  let component: RegisterComercioComponent;
  let fixture: ComponentFixture<RegisterComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComercioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
