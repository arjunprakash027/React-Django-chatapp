from django.urls import path
from .views import greeting,RegisterNewUser
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("hello/", greeting.as_view(),name="greeting"),
    path("register/", RegisterNewUser.as_view(),name="register"),
    path("login/", obtain_auth_token,name="create_token"),
]

