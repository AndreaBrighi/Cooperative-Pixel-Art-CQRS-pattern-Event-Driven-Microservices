import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelGridComponent } from './pixel-grid.component';

describe('PixelGridComponent', () => {
  let component: PixelGridComponent;
  let fixture: ComponentFixture<PixelGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixelGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PixelGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
