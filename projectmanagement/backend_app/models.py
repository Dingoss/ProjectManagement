from django.db import models

# Create your models here.
# models.py

class Board(models.Model):
    name = models.CharField(max_length=100)  # Название доски

    def __str__(self):
        return self.name

class Column(models.Model):
    board = models.ForeignKey(Board, related_name='columns', on_delete=models.CASCADE)  # Связь с доской
    name = models.CharField(max_length=100)  # Название столбца

    def __str__(self):
        return self.name

class Card(models.Model):
    column = models.ForeignKey(Column, related_name='cards', on_delete=models.CASCADE)  # Связь с столбцом
    title = models.CharField(max_length=100)  # Название карточки
    description = models.TextField()  # Описание карточки

    def __str__(self):
        return self.title
