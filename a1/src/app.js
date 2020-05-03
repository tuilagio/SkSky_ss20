
export class App {
  constructor() {
    this.message = 'Hello world';
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Test title";
    config.map([
      {route: '', name: 'home', moduleId: PLATFORM.moduleName('todos/index'), title: 'All TODOS'},
      {route: 'edit/:slug', name: 'edit-todo', moduleId: PLATFORM.moduleName('todos/edit'), title: 'Edit'},
      {route: 'add', name: 'add-todo', moduleId: PLATFORM.moduleName('todos/add'), title: 'Add'},
      {route: 'impressum', name: 'impressum', moduleId: PLATFORM.moduleName('impressum/about'), title: 'Impressum'}
    ]);
  }
}
