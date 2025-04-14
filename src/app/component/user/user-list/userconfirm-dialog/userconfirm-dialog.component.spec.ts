import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserconfirmDialogComponent } from './userconfirm-dialog.component';

describe('UserconfirmDialogComponent', () => {
  let component: UserconfirmDialogComponent;
  let fixture: ComponentFixture<UserconfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserconfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserconfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
