export class Add {
  constructor() {
    this.message = 'Hello world';
  }

  post_todo() {
    const url = `http://127.0.0.1:8000/todos/`
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        content: this.content,
        deadline: this.deadline,
        done: this.done
    }));
  }
}
