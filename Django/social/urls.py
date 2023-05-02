
from django.views.generic import TemplateView
from django.urls import path
from .views import *

app_name='social'

urlpatterns = [
   
    path('',TemplateView.as_view(template_name="social/index.html")),
   
]
