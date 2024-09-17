import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcesConseilsComponent } from './ressources-conseils.component';

describe('RessourcesConseilsComponent', () => {
  let component: RessourcesConseilsComponent;
  let fixture: ComponentFixture<RessourcesConseilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourcesConseilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RessourcesConseilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
