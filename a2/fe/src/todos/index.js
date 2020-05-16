import {inject} from 'aurelia-framework';
import {TodoService} from '../common/services/todo-services';
import {Router} from 'aurelia-router';

@inject (Router, TodoService)
export class Index {
  constructor(Router, TodoService) {
    this.router = Router;
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

  delete_todo(id) {
    const url = `http://127.0.0.1:8000/todos/${id}/`
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    setTimeout(() => {
      // this.router.navigateToRoute('add-todo');
      let r = document.getElementById(id)
      r.remove()
    }, 100);
  }
}
