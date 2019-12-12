import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService} from '../../services/todo.service';
import {Todo} from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  setClasses() {
    const classes = {
      todo: true,
      'is-completed': this.todo.completed,
    };

    return classes;
  }

  onToggle(todo) {
    // toggle on UI
    todo.completed = !todo.completed;
    // Toggle on Server
    this.todoService.toggleCompleted(todo).subscribe(thisTodo =>
    console.log(thisTodo)
    );
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
