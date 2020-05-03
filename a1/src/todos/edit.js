import {inject} from 'aurelia-framework';
import {TodoService} from '../common/services/todo-services';

@inject(TodoService)
export class Edit {
  constructor(TodoService) {
    this.todoService = TodoService
  }

  activate(params) {
    this.error = '';
    this.todoService.find(params.slug).then(data => {
      this.todo = data.todo;
    }).catch(error => {
      this.error = error.message;
    })
  }
}
