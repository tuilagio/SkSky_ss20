
```bash
# .....\a2\be
python -m venv env
env\Scripts\activate

python -m pip install django
python -m  pip install djangorestframework

django-admin startproject a2_be
cd a2_be
django-admin startapp a2
cd ..

# uni\SkSky_ss20\a2\be\a2_be
python manage.py migrate
# password
python manage.py createsuperuser --email admin@example.com --username admin
python manage.py runserver
```

``` bash
# http://127.0.0.1:8000/users/
```