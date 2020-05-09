import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongCartComponent } from './song-cart.component';

describe('SongCartComponent', () => {
  let component: SongCartComponent;
  let fixture: ComponentFixture<SongCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
