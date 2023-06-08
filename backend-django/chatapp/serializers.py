from rest_framework import serializers
from .models import Room, Message
from django.contrib.auth.models import User

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','name')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id','value','date','user','room')

