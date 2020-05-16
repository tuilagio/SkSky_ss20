import {inject} from 'aurelia-framework';
import {AuthService} from './auth-service';

@inject(AuthService)
export class TodoService {

	constructor(AuthService) {
		this.authService = AuthService;
		// Fake a server response delay
		this.delay = 100;
		// Seed post data if it doesn't exist
		if (!this.todos) {
			this.todos = [
				{
					id: "1",
					content: 'My first TODO',
					deadline: '22/2/2022',
					done: '30%',
				},
				{
					id: "2",
					content: 'My Second TODO',
					deadline: 'Tomorrow',
					done: '0%',
				},
				{
					id: "3",
					content: 'My Third TODO',
					deadline: '19/03/2021',
					done: '70%', 
				}
			]
		}
	}

	allTodos() {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
			// simulate backend
		  	if (this.todos) {
				  // resolve({ todos: this.todos });
				const url = 'http://127.0.0.1:8000/todos/';
				fetch(url)
				.then(response => response.json())
				.then(data => {
					// console.log(data);
					resolve({ todos: data });
				});
		  	} else {
		  		reject(new Error('There was an error retrieving the todos.'));
		  	}
		  }, this.delay);
		});		
	}

	find(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// let todo = this.todos.find(post => post.id.toLowerCase() === id.toLowerCase());
				// if (todo) {
				// 	console.log(todo)
				//   	resolve({ todo });
				// } else {
				// 	reject(new Error('Todo not found.'));
				// }

				const url = `http://127.0.0.1:8000/todos/${id}/`;
				console.log(url)
				fetch(url)
					.then(response => response.json())
					.then(data => {
						// console.log(data);
						resolve({ todo: data });
					});
			}, this.delay);
		});
	}
	/*
	allPostPreviews() {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	if (this.posts) {
		  		let previews = this.posts.map(post => {
			  		return {
			  			title: post.title,
			  			body: post.body.substring(0,200) + '...',
			  			author: post.author,
			  			slug: post.slug,
			  			tags: post.tags,
			  			createdAt: post.createdAt
			  		}
			  	});
			  	previews.sort((a,b) => b.createdAt - a.createdAt);
			  	resolve({ posts: previews });
		  	} else {
		  		resolve({ error: 'There was an error retrieving the posts.' });
		  	}
		  }, this.delay);
		});		
	}

	allArchives() {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let archives = [];
		  	this.posts.sort((a,b) => b.createdAt - a.createdAt);
		  	this.posts.forEach(post => {
		  		archives.push(`${months[post.createdAt.getMonth()]} ${post.createdAt.getFullYear()}`);
		  	});
		  	if (archives) {	
			  	resolve({ archives: archives.filter((v, i, a) => a.indexOf(v) === i) });		  		
		  	} else {
		  		resolve({ error: 'There was an error retrieving the archives.' });
		  	}
		  }, this.delay);
		});		
	}

	allTags() {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let tags = [];
		  	this.posts.forEach(post => {
		  		tags = tags.concat(post.tags);
		  	});
		  	if (tags) {	
			  	resolve({ tags: tags.filter((v, i, a) => a.indexOf(v) === i) });		  		
		  	} else {
		  		resolve({ error: 'There was an error retrieving the tags.' });
		  	}
		  }, this.delay);
		});		
	}

	create(post) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let currentUser = this.authService.currentUser;
		  	let slug = this.slugify(post.title);
				if (currentUser) {
					this.posts.push({
						title: post.title,
						body: post.body,
						author: currentUser,
						slug,
						tags: post.tags,
						createdAt: new Date()						
					});
					resolve({ slug });
				} else {
					resolve({ error: 'You must be logged in to create a post.' });
				}
		  }, this.delay);
		});	
	}

	find(slug) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let post = this.posts.sort((a,b) => b.createdAt - a.createdAt).find(post => post.slug.toLowerCase() === slug.toLowerCase());
		  	if (post) {
			  	resolve({ post });
		  	} else {
		  		resolve( { error: 'Post not found.' } );
		  	}
		  }, this.delay);
		});	
	}

	postsByTag(tag) {		
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	if (!this.posts) {
		  		resolve({ error: 'Error finding posts.' });
		  	} else {
			  	resolve({ posts: this.posts.filter(post => post.tags.includes(tag)).sort((a,b) => b.createdAt - a.createdAt) });
		  	}
		  }, this.delay);
		});			
	}

	postsByArchive(archive) {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	if (!this.posts) {
		  		resolve({ error: 'Error finding posts.' });
		  	} else {
			  	resolve({ posts: this.posts.filter(post => {
			  		return archive === `${months[post.createdAt.getMonth()]} ${post.createdAt.getFullYear()}`;
			  	}).sort((a,b) => b.createdAt - a.createdAt) });
		  	}
		  }, this.delay);
		});			
	}

	slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
	}

	update(post) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	// Get post based on slug and auther
		  	let toUpdate = this.posts.find(x => {
		  		return x.slug === post.slug && x.author === this.authService.currentUser;
		  	})
		  	if (!toUpdate) {
		  		resolve({ error: 'There was an error updating the post.' });	
		  	} else {
		  		toUpdate = post;
		  		resolve({ slug: toUpdate.slug });
		  	}
		  }, this.delay);
		});			
	} */

}