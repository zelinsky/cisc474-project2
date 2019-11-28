import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsViewComponent } from './songs-view.component';

describe('SongsViewComponent', () => {
  let component: SongsViewComponent;
  let fixture: ComponentFixture<SongsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
