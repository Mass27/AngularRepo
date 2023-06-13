import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmdmComponent } from './pmdm.component';

describe('PmdmComponent', () => {
  let component: PmdmComponent;
  let fixture: ComponentFixture<PmdmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PmdmComponent]
    });
    fixture = TestBed.createComponent(PmdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
