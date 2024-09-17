import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresSauvegardeesComponent } from './offres-sauvegardees.component';

describe('OffresSauvegardeesComponent', () => {
  let component: OffresSauvegardeesComponent;
  let fixture: ComponentFixture<OffresSauvegardeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresSauvegardeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffresSauvegardeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
