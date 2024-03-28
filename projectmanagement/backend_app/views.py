from django.shortcuts import render
from rest_framework import generics
from .models import Board, Column, Card
from .serializer import BoardSerializer, ColumnSerializer, CardSerializer

from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class BoardListCreate(generics.ListCreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

class ColumnListCreate(generics.ListCreateAPIView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

class ColumnDetail(generics.DestroyAPIView):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer    

class CardListCreate(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class CardRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class ColumnListByBoard(generics.ListAPIView):
    serializer_class = ColumnSerializer

    def get_queryset(self):
        board_id = self.kwargs['board_id']
        return Column.objects.filter(board_id=board_id)
