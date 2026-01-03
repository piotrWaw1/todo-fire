import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosFooter } from './todos-footer';

describe('TodosFooter', () => {
  let component: TodosFooter;
  let fixture: ComponentFixture<TodosFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
