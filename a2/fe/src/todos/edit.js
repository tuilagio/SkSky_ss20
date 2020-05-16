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
      // console.log(this.todo)
    }).catch(error => {
      this.error = error.message;
    })
  }

  put_todo() {
    console.log(JSON.stringify({
      id: parseInt(this.id),
      content: this.content,
      deadline: this.deadline,
      done: this.done
    }))
    const url = `http://127.0.0.1:8000/todos/${this.id}/`
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        id: parseInt(this.id),
        content: this.content,
        deadline: this.deadline,
        done: this.done
    }));
  }
}
