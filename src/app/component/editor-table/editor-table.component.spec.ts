import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTableComponent } from './editor-table.component';

describe('EditorTableComponent', () => {
  let component: EditorTableComponent;
  let fixture: ComponentFixture<EditorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
