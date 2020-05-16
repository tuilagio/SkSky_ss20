import {inject} from 'aurelia-framework';
import {TodoService} from '../common/services/todo-services'

@inject (TodoService)
export class Index {
  constructor(TodoService) {
    this.todoService = TodoService;
  }

  attached() {
    this.error = '';
    this.todoService.allTodos().then(data => {
      this.todos = data.todos
    }).catch(error => {
      this.error = error.message
    })
  }
}
