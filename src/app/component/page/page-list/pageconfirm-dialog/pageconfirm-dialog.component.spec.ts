import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageconfirmDialogComponent } from './pageconfirm-dialog.component';

describe('PageconfirmDialogComponent', () => {
  let component: PageconfirmDialogComponent;
  let fixture: ComponentFixture<PageconfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageconfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageconfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
