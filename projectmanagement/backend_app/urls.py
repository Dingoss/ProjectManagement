from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('boards/', views.BoardListCreate.as_view()),
    path('columns/', views.ColumnListCreate.as_view()),
    path('cards/', views.CardListCreate.as_view()),
    path('columns/<int:pk>/', views.ColumnDetail.as_view()),  # Добавляем URL для удаления столбцов
    path('cards/<int:pk>/', views.CardRetrieveUpdateDestroy.as_view(), name='card-detail'),
    
]