import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerconfirmDialogComponent } from './bannerconfirm-dialog.component';

describe('BannerconfirmDialogComponent', () => {
  let component: BannerconfirmDialogComponent;
  let fixture: ComponentFixture<BannerconfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerconfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerconfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
