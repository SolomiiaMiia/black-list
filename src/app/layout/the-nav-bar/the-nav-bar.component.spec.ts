import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheNavBarComponent } from './the-nav-bar.component';

describe('TheNavBarComponent', () => {
  let component: TheNavBarComponent;
  let fixture: ComponentFixture<TheNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
