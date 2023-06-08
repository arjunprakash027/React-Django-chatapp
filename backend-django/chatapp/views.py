from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from django.contrib.auth.models import User


# Create your views here.
class RoomView(APIView):
    permission_classes = ( IsAuthenticated, )

    def get(self,request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        print(type(request.data))
        try: 
            Room.objects.get(name=request.data['name'])
            return Response({"error":"Room with that name already exists"},status=400)
        except:
            serializer = RoomSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                room_saved = serializer.save()
            return Response({"success":"Room '{}' created successfully".format(room_saved.name)})

class MessageView(APIView):
    permission_classes = ( IsAuthenticated, )

    def get(self,request):
        messages_value = {}
        messages = Message.objects.filter(room=request.data.get('room'))
        for message in messages:
            messages_value[message.id] = {
                'value':message.value,
                'date':message.date,
                'user':message.user.first_name,
            }
        print(messages_value)
        return Response(messages_value)
    
    def post(self,request):
        print(request.data)
        user = User.objects.get(username=request.data['user'])
        print(user.id)
        message_data = {
            'value':request.data['value'],
            'user':user.id,
            'room':request.data['room'],
        }
        serializer = MessageSerializer(data=message_data)
        if serializer.is_valid(raise_exception=True):
            message_saved = serializer.save()
        return Response({"success":"Message '{}' created successfully".format(message_saved.value)})
    