import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDossierComponent } from './manage-dossier.component';

describe('ManageDossierComponent', () => {
  let component: ManageDossierComponent;
  let fixture: ComponentFixture<ManageDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
