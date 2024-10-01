import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandformsComponent } from './expandforms.component';

describe('ExpandformsComponent', () => {
  let component: ExpandformsComponent;
  let fixture: ComponentFixture<ExpandformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandformsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
