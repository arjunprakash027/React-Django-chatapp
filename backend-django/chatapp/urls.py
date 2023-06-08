from django.urls import path
from .views import RoomView, MessageView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("room/", RoomView.as_view(),name="room"),
    path("message/", MessageView.as_view(),name="message"),
]