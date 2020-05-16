from django.urls import path
from a2 import views

urlpatterns = [
    path('todos/', views.todo_list),
    path('todos/<int:pk>/', views.todo_detail),
]