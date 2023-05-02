from django.urls import path
from .views import CustomUserCreate,BlacklistTokenUpdateView,LoginView,UserDetailAPIView

app_name='users'

urlpatterns=[
    path('register/',CustomUserCreate.as_view(),name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/<int:id>/', UserDetailAPIView.as_view(), name='user-detail'),
]