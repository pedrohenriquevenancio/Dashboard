import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRightSideBarComponent } from './home-right-side-bar.component';

describe('HomeRightSideBarComponent', () => {
  let component: HomeRightSideBarComponent;
  let fixture: ComponentFixture<HomeRightSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRightSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRightSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
