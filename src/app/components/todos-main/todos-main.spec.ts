import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosMain } from './todos-main';

describe('TodosMain', () => {
  let component: TodosMain;
  let fixture: ComponentFixture<TodosMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
