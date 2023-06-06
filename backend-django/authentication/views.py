from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class RegisterNewUser(APIView):
    def post(self,request):
        username = request.data.get("username")
        email = request.data.get("email")
        name = request.data.get("name")
        
        try:
            user  = User.objects.create_user(
                username = username,
                password = "random123",
                email = email,
                first_name = name,
            )
            user.save()
            print("{} created successfully".format(user.username))
            return Response({"message":"User created"})
        except:
            return Response({"message":"User creation failed or user already exists"})

class greeting(APIView):
    permission_classes = ( IsAuthenticated, )

    def get(self,request):
        content = {'message': 'Hello, {}!'.format(request.user.first_name)}
        return Response(content)

# Create your views here.
