import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MescandidaturespourENtrepriseComponent } from './mescandidaturespour-entreprise.component';

describe('MescandidaturespourENtrepriseComponent', () => {
  let component: MescandidaturespourENtrepriseComponent;
  let fixture: ComponentFixture<MescandidaturespourENtrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MescandidaturespourENtrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MescandidaturespourENtrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
