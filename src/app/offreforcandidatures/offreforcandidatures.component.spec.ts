import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreforcandidaturesComponent } from './offreforcandidatures.component';

describe('OffreforcandidaturesComponent', () => {
  let component: OffreforcandidaturesComponent;
  let fixture: ComponentFixture<OffreforcandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreforcandidaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreforcandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
