
# Structure folder
- ``be/`` Backend. Use Django and Django REST framework.
- `fe/` Frontend. Use Aurelia framework.

# How to install:

## Backend:

```bash
# .....\a2\be
python -m venv env
env\Scripts\activate

python -m pip install django
python -m  pip install djangorestframework
python -m pip install django-cors-headers

django-admin startproject a2_be
cd a2_be
django-admin startapp a2
cd ..

# uni\SkSky_ss20\a2\be\a2_be
# may need this after adding new model: python manage.py makemigrations a2
python manage.py migrate
# password
python manage.py createsuperuser --email admin@example.com --username admin
python manage.py runserver
```


Add some todos:
``` python
# python manage.py shell
# run this in django shell terminal
from a2.models import Todo
from a2.serializers import TodoSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

# todo = Todo(content='todo 1', deadline='22/22/2012', done='0%')
# todo.save()

# todo = Todo(content='todo 2', deadline='22/22/1900', done='100%')
# todo.save()

for i in range(1, 100):
    todo = Todo(content=f'todo {i}', deadline=f'{i}/{i}/20{i}', done='0%')
    todo.save()
```

API endpoints (leading /):
``` js
// All todo:
// GET http://localhost:8000/todos/
[
    {
        "deadline": "1/1/201",
        "content": "todo 1",
        "done": "0%",
        "id": 1002
    },
    {
        "deadline": "2/2/202",
        "content": "todo 2",
        "done": "0%",
        "id": 1003
    }
]
// Get todo with id=1
// GET http://localhost:8000/todos/1/
{
    "deadline": "1/1/201",
    "content": "todo 1",
    "done": "0%",
    "id": 1002
}
// Delete todo id=1
// DELETE http://localhost:8000/todos/1/

// POST new todo
// POST http://localhost:8000/todos/
{
    "deadline": "1/1/201",
    "content": "todo 1",
    "done": "0%"
}

// PUT new todo with id=1
// POST http://localhost:8000/todos/1/
{
    "deadline": "1/1/201",
    "content": "NEW todo 1",
    "done": "100%"
}
```


## Frontend:
``` bash
cd fe
npm install
au run --watch
```
Check web http://localhost:8080