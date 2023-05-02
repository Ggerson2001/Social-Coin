from rest_framework import serializers, status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

