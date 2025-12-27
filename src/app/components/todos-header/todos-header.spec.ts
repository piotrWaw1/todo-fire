import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosHeader } from './todos-header';

describe('TodosHeader', () => {
  let component: TodosHeader;
  let fixture: ComponentFixture<TodosHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
