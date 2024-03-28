from rest_framework import serializers
# serializers.py
from rest_framework import serializers
from .models import Board, Column, Card

class CardSerializer(serializers.ModelSerializer):
    column = serializers.PrimaryKeyRelatedField(queryset=Column.objects.all())  # или какой-то другой способ указания столбца
    class Meta:
        model = Card
        fields = '__all__'  # Всі поля моделі Card 

class ColumnSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)  # Включаєм серіалізатор CardSerializer для зв'язку карточок

    class Meta:
        model = Column
        fields = ['id', 'board', 'name', 'cards']  # Вказуємо поля моделі Column, які мають бути серіалізовані

class BoardSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, read_only=True)  # Включаєм серіалізатор ColumnSerializer для зв'язку карточок

    class Meta:
        model = Board
        fields = ['id', 'name', 'columns']  # Вказуємо поля моделі Board, які мають бути серіалізовані
